let allBlogs = []; // global storage

// === Main Function ===
async function getAllBlogs(blogCategory, buildType) {
  try {
    const data = await fetchDataAllBlogs(blogCategory);
    allBlogs = data.data; // save it globally

    // Sort by date descending
    allBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    renderBlogs(allBlogs, buildType);

  } catch (error) {
    console.error('Failed to load blogs:', error);
  }
}

function renderBlogs(blogs, buildType) {
  const blogElements = document.getElementById('blogs');
  const recentElements = document.getElementById('recent-blogs');

  const htmlSections = [];
  const htmlRecents = [];

  // limit recent blogs to max 5
  const recentBlogs = blogs.slice(0, 5);

  blogs.forEach((blog, index) => {
    if (buildType === "card" || buildType === "all") {
      let card = createBlogCard(blog);
      // add inline animation delay
      card = card.replace(
        'class="col-lg-6 blog-card"',
        `class="col-lg-6 blog-card" style="animation-delay: ${index * 0.1}s"`
      );
      htmlSections.push(card);
    }
  });

  recentBlogs.forEach((blog) => {
    if (buildType === "recent" || buildType === "all") {
      htmlRecents.push(createRecentBlogs(blog));
    }
  });

  if ((buildType === "card" || buildType === "all") && blogElements) {
    blogElements.innerHTML = htmlSections.join('');
  }

  if ((buildType === "recent" || buildType === "all") && recentElements) {
    recentElements.innerHTML = htmlRecents.join('');
  }
}

async function fetchDataAllBlogs(blogCategory) {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=blogs&category=${blogCategory}`;
    return await httpGetPromises(url);
}

// === Create Team Card ===
function createBlogCard(data) {
  return `
    <div class="col-lg-6 blog-card">
        <article>
        <div class="post-img">
            <img src="${data.header_image}" alt="" class="img-fluid">
        </div>
        <p class="post-category">${data.categories}</p>
        <h2 class="title">
            <a href="case-study-details.html?slug=${data.slug}&id=${data.id}">${data.title}</a>
        </h2>
        <div class="d-flex align-items-center">
            <img src="${data.author_profile_image}" alt="" class="img-fluid post-author-img flex-shrink-0">
            <div class="post-meta">
            <p class="post-author">${data.author}</p>
            <p class="post-date">
                <time datetime="${dateFormatterYMD(data.date)}">${dateFormatter(data.date)}</time>
            </p>
            </div>
        </div>
        </article>
    </div><!-- End post list item -->
  `;
}


function createRecentBlogs(data){
  return `<div class="post-item">
            <img src="${data.header_image}" alt="" class="flex-shrink-0 rounded">
            <div>
              <h4><a href="blog-details.html">${data.title}</a></h4>
              <time datetime="${dateFormatterYMD(data.date)}">${dateFormatter(data.date)}</time>
            </div>
          </div>`
}
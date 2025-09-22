// === Main Function ===
async function getAllBlogs(blogCategory, buildType) {
  try {
    const data = await fetchDataAllBlogs(blogCategory);
    const result = data.data;

    // Sort by date descending
    result.sort((a, b) => new Date(b.date) - new Date(a.date));

    const blogElements = document.getElementById('blogs');
    const recentElements = document.getElementById('recent-blogs');

    const htmlSections = [];
    const htmlRecents = [];

    result.forEach((blog) => {
      if (buildType === "card") {
        htmlSections.push(createBlogCard(blog));
      } else if (buildType === "recent") {
        htmlRecents.push(createRecentBlogs(blog));
      } else if (buildType === "all") {
        htmlSections.push(createBlogCard(blog));
        htmlRecents.push(createRecentBlogs(blog));
      }
    });

    if ((buildType === "card" || buildType === "all") && blogElements) {
      blogElements.innerHTML = htmlSections.join('');
    }

    if ((buildType === "recent" || buildType === "all") && recentElements) {
      recentElements.innerHTML = htmlRecents.join('');
    }

  } catch (error) {
    console.error('Failed to load blogs:', error);
  }
}

async function fetchDataAllBlogs(blogCategory) {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=blogs&category=${blogCategory}`;
    return await httpGetPromises(url);
}

// === Create Team Card ===
function createBlogCard(data) {

  return `
    <div class="col-lg-6">
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
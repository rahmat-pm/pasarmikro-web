// === Main Function ===
async function getBlogDetails() {
  try {
    const roleId = getBlogId()
    const data = await fetchBlogData(roleId);
    const success = data.success

    if(!success){
        window.location.href= "404.html"
    }

    const result = data.data

    document.getElementById('header-image').src = result.header_image
    document.getElementById('content').innerHTML = result.description
    document.getElementById('tags-details').innerHTML = generateTags(result.tags)
    setValueToElement("title", result.title)
    setValueToElement("date", dateFormatter(result.date))
    setValueToElement("category", result.categories)
    setValueToElement("author", result.author)
  } catch (error) {
    console.error('Failed to load role:', error);
  }
}

async function fetchBlogData(blogId) {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=blog&blogId=${blogId}`;
    return await httpGetPromises(url);
}

function getBlogId(){
  const params = new URLSearchParams(window.location.search);
  const roleId = params.get('id');
  return roleId
}

function generateTags(tags){
  let html = []
  const tagList = (tags.split(","))

  for(let i=0; i<tagList.length; i++){
    html.push(`<li><a href='#'>${tagList[i]}</a></li>`)
  }
  const finalHTML = html.join("")

  return finalHTML
}



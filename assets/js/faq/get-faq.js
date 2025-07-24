// === Main Function ===
async function getAllFaqs() {
  try {
    const data = await fetchDataAllFaqs();
    const result = data.data

    const faqElement = document.getElementById('faqAccordion');
    const htmlSections = [];

    result.forEach((faq) => {
        const faqHTML = createFaq(faq)

        htmlSections.push(faqHTML)
    });

    const finalHTML = htmlSections.join('');
    faqElement.innerHTML = finalHTML;

  } catch (error) {
    console.error('Failed to load faqs:', error);
  }
}

async function fetchDataAllFaqs() {
    const url = `${API_URL}?api_key=${API_TOKEN}&route=faq`;
    return await httpGetPromises(url);
}

// === Create Team Card ===
function createFaq(faq) {

  return `
    <div class="accordion-item">
        <h2 class="accordion-header" id="faq-heading-${faq.id}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-${faq.id}" aria-expanded="false" aria-controls="faq-collapse-${faq.id}">
            ${faq.id}. ${faq.question}
        </button>
        </h2>
        <div id="faq-collapse-${faq.id}" class="accordion-collapse collapse" aria-labelledby="faq-heading-${faq.id}" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
            ${faq.answer}
        </div>
        </div>
    </div>
  `;
}
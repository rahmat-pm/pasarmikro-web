function contactUs() {
  const formElement = document.getElementById('contact-form');

  formElement.addEventListener('submit', async function (event) {
    event.preventDefault();

    display('submit-button', 'none');
    display('loading', 'block');
    grecaptcha.ready(async function () {
      try {
        // Get reCAPTCHA token just before sending the form
        const token = await grecaptcha.execute('6LcXU44rAAAAAL6l6FikP4IUFm_Y3CNtzmtgxMfB', { action: 'submit' });

        // Add token to form data
        const formData = new FormData(formElement);
        formData.append('recaptcha_token', token);
        const serializedForm = Object.fromEntries(formData.entries());

        const url = `${API_URL}?api_key=${API_TOKEN}&route=contact`;

        const response = await fetch(url, {
          method: 'POST',
          redirect: 'follow',
          body: JSON.stringify(serializedForm),
          headers: {
            'Content-type': 'text/plain;charset=utf-8'
          }
        });

        const result = await response.json();

        if (result.success) {
          notification('success', "Success!", "Thank you. We have successfully received your data. Our team will contact you soon.");
          formElement.reset();
          display('submit-button', 'block');
          display('loading', 'none');
        } else {
          notification('error', "Oops!", "An error occurred, please try again.");
          display('submit-button', 'block');
          display('loading', 'none');
        }
      } catch (error) {
        console.warn(error);
        notification('error', "Oops!", "An error occurred, please try again.");
        display('submit-button', 'block');
        display('loading', 'none');
      }
    })
  });
}

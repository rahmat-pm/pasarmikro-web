function contactUs() {
  const formElement = document.getElementById('contact-form');

  formElement.addEventListener('submit', function (event) {
    event.preventDefault();

    display('submit-button', 'none');
    display('loading', 'block');

    // Wait until reCAPTCHA is ready
    grecaptcha.ready(async function () {
      try {
        // Get reCAPTCHA token
        const token = await grecaptcha.execute('6LcXU44rAAAAAL6l6FikP4IUFm_Y3CNtzmtgxMfB', { action: 'submit' });

        // Prepare FormData
        const formData = new FormData(formElement);
        formData.append('recaptcha_token', token);

        const url = `${API_URL}?api_key=${API_TOKEN}&route=contact`;

        const response = await fetch(url, {
          method: 'POST',
          body: formData
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
          notification('success', "Success!", "Thank you. We have successfully received your data. Our team will contact you soon.");
          formElement.reset();
        } else {
          notification('error', "Oops!", "An error occurred, please try again.");
        }
      } catch (error) {
        console.warn(error);
        notification('error', "Oops!", "An error occurred, please try again.");
      }

      display('submit-button', 'block');
      display('loading', 'none');
    });
  });
}

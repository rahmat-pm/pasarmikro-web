function contactUs() {
  const formElement = document.getElementById('contact-form');

  formElement.addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
      display('submit-button', 'none');
      display('loading', 'block');

      const recaptchaToken = grecaptcha.getResponse();
      if (!recaptchaToken) {
        notification('error', "Oops!", "Please verify the captcha first.");
        display('submit-button', 'block');
        display('loading', 'none');
        return;
      }

      const formData = new FormData(formElement);
      const serializedForm = Object.fromEntries(formData);
      serializedForm['recaptcha_token'] = recaptchaToken;

      const url = `${API_URL}?api_key=${API_TOKEN}&route=contact`;

      const response = await fetch(url, {
        redirect: "follow",
        method: 'POST',
        body: JSON.stringify(serializedForm),
        headers: {
          'Content-type': 'text/plain;charset=utf-8'
        }
      });

      if (response.ok) {
        await response.json();
        notification('success', "Success!", "Thank you. We have successfully received your data. Our team will contact you soon..");
        formElement.reset();
        grecaptcha.reset(); // Reset the captcha
      } else {
        notification('error', "Oops!", "An error occurred, please try again..");
      }

      display('submit-button', 'block');
      display('loading', 'none');

    } catch (error) {
      console.warn(error);
      notification('error', "Oops!", "An error occurred, please try again..");
      display('submit-button', 'block');
      display('loading', 'none');
    }
  });
}

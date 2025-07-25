function contactUs() {
  const formElement = document.getElementById('contact-form');

  formElement.addEventListener('submit', async function (event) {
    event.preventDefault();

    display('submit-button', 'none');
    display('loading', 'block');

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

      if (response.ok) {
        await response.json();
        notification('success', "Sukses!", "Terimakasih. Data anda sudah berhasil kami terima. Tim kami akan segera menghubungi anda.");
        formElement.reset();
      } else {
        notification('error', "Oops!", "Terjadi kesalahan, silahkan coba lagi.");
      }
    } catch (error) {
      console.warn(error);
      notification('error', "Oops!", "Terjadi kesalahan, silahkan coba lagi.");
    }

    display('submit-button', 'block');
    display('loading', 'none');
  });
}

function contactUs() {
    const formElement = document.getElementById('contact-form');
  
    formElement.addEventListener('submit', async function (event) {
      event.preventDefault();
        try {
          display('submit-button', 'none');
          display('loading', 'block');
  
          const formData = new FormData(formElement);
          const serializedForm = Object.fromEntries(formData);

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
            notification('success', "Sukses!", "Terimakasih. Data anda sudah berhasil kami terima. Tim kami akan segera menghubungi anda.");
            display('submit-button', 'block');
            display('loading', 'none');
            formElement.reset();
          } else {
            notification('error', "Oops!", "Terjadi kesalahan, silahkan coba lagi.");
            display('submit-button', 'block');
          }
        } catch (error) {
          console.warn(error);
          notification('error', "Oops!", "Terjadi kesalahan, silahkan coba lagi.");
          display('submit-button', 'block');
        }
    });
  }

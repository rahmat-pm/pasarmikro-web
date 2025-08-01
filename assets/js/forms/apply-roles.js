function applyRoles() {
  const formElement = document.getElementById('apply-form');

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
        formData.append('token', token)
        formData.append('roleId', getRoleId());

        // Get the file (assumes input name="cv")
        const file = formData.get('cv');

        // ✅ Validate file presence
        if (!file || file.size === 0) {
        alert("Please attach a file (CV is required).");
        return;
        }

        // ✅ Read file content as Base64
        const reader = new FileReader();

        reader.onload = function () {
        const base64Content = reader.result.split(',')[1]; // remove the prefix

        // Serialize the text fields
        const serializedForm = Object.fromEntries(formData.entries());

        // Add file information
        serializedForm.cv = {
            name: file.name,
            type: file.type,
            size: file.size,
            content: base64Content
        };

        const url = `${API_URL}?api_key=${API_TOKEN}&route=apply-role`;

        fetch(url, {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify(serializedForm),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8' // as required by Apps Script
            }
        })
            .then(response => response.json())
            .then(result => {
            if(result.success){
              notification('success', "Success!", "Thank you. We have successfully received your data.");
              formElement.reset();
              display('submit-button', 'block');
              display('loading', 'none');
              console.log(result)
            } else {
              notification('error', "Oops!", "An error occurred, please try again.");
              display('submit-button', 'block');
              display('loading', 'none');
        }
            
        })
            .catch(error => {
              notification('error', "Oops!", "An error occurred, please try again.");
              display('submit-button', 'block');
              display('loading', 'none');
              console.error("Submission failed:", error);
        });

        };

        reader.readAsDataURL(file);

      } catch (error) {
        console.warn(error);
        notification('error', "Oops!", "An error occurred, please try again.");
        display('submit-button', 'block');
        display('loading', 'none');
      }
    })
  });
}

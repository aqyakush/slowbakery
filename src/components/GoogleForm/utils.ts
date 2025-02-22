export const onFormSubmit = (data: Record<string, any>, url: string) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

    fetch(url, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    }).then(() => {
      console.log('Form successfully submitted');
    }).catch((error) => {
      console.error('Error submitting form:', error);
    });
  };
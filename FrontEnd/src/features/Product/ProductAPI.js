export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/' + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchInsertProduct(formData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/insertproduct/', {
      method: 'POST',
      body: formData
    }
    );
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function UpdateProduct(id) {
  // console.log(id);

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/updateproduct/' + id)
    const data = await response.json();
    resolve({ data })
  }
  )
}

export function EditProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/editproduct/' + update.id, {
      method: 'POST',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  })
}

export function DeleteProduct(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/deleteproduct/' + id)
    const data = await response.json();
    resolve({ data })
  }
  )
}

export function fetchCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories/');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchInsertCategories(formData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories/insertcategory/', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'content-type': 'application/json' }
    }
    );
    const data = await response.json();
    resolve({ data })
  }
  );
}


export function UpdateCategory(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories/updatecategory/' + id);
    const data = await response.json();
    resolve({ data })
  }
  )
}

export function EditCategory(edit) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories/editcategory/' + edit.id, {
      method: 'POST',
      body: JSON.stringify(edit),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json();
    resolve({ data })
  })
}

export function DeleteCategory(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories/deletecategory/' + id)
    const data = await response.json();
    resolve({ data })
  }
  )
}
export function addToCart(item) {
  console.log(item);
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    console.log(response);
    const data = await response.json();
    resolve({ data });
  });
};    

export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart');
    const data = await response.json();
    resolve({ data });
  });
};

export function deleteItemFromCart(id) {
  console.log(id);
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/' + id, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    console.log(response);
    const data = await response.json();
    resolve({ data })
  });
}

export function updateCart(update) {
  // console.log(update);
}

export function resetCart() {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id)
    }
    resolve({ status: 'success' })
  })
}
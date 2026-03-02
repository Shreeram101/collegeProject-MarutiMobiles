export function createOrder(order) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/orders', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        resolve({ data })
    })
}

export function fetchAllOrders(sort) {
    let queryString = '';
    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
    }

    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/orders?' + queryString);
        const data = await response.json();
        resolve({ data: { orders: data, totalOrders: data.length } });
    })
}

export function updateOrder(order) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/orders/' + order.id, {
            method: 'PATCH',
            body: JSON.stringify(order),
            headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        resolve({ data })
    })
}
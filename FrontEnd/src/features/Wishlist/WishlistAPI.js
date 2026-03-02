export function addToWishlist(item) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/wishlist', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        resolve({ data });
    })
}

// YEH NAYA FUNCTION ADD KAREIN
export function fetchWishlistByUserId(userId) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/wishlist?user=' + userId);
        const data = await response.json();
        resolve({ data });
    });
}


export function deleteFromWishlist(itemId) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/wishlist/' + itemId, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        // resolve me id return kar rahe hain taki redux state se us item ko hata sakein
        resolve({ data: { id: itemId } }); 
    });
}
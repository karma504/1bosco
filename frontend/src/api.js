

// async function getJson(path) {
//     if (res.ok){
//         new Error(`HTTP ${res.status}`)
//     }
    
//     return res.json()
// }


// export function get getSettings(){
//     return getJson(`api/pages?path=${encodeURIComponent(path)}`)
// }

// export function get getPages(){
//     return getJson(`api/pages?path=${encodeURIComponent(path)}`)
// }

async function getJson(path) {
    const res = await fetch(path)

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
    }

    return res.json()
}

export async function getSettings() {
    try {
        return await getJson(`/api/settings`)
    } catch (err) {
        return console.error("Не вдалося завантажити налаштування, використано дефолтні:", err)
    }
}

export async function getPages(path) {
    try {
        return await getJson(`/api/pages?path=${encodeURIComponent(path)}`)
    } catch (err) {
        console.error(`Не вдалося завантажити сторінку "${path}":`, err)
        return null
    }
}

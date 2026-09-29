import { getSetting, getPages } from '/api'

async function start() {
  // const settings = await getSetting()
  try{
    const {settings, page} = await Promise.all(
    getSetting(),
    getPages(location.pathname)
  )
  
  console.log(settings)
  console.log(page)
  }catch(error){
    console.log(settings,pages)
  }
}

start()
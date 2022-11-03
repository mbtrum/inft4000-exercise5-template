window.electronAPI.onTrackingUpdate((_event, value) => {   
    const cpu =  value.cpu.toFixed(0)
    const mem =  value.mem.toFixed(0)

    document.getElementById('cpu-usage').innerHTML = cpu + '%'
    document.getElementById('mem-usage').innerHTML = mem + '%'
})
const fs = require('fs')

const encode_base64 = (file, ext = 'png') => {
  return `data:image/${ext};base64,${fs.readFileSync(file, 'base64')}`
}

const encode_path = (path, target) => {
  fs.readdir(path, (err, files) => {
    if (err) return 0;

    const result = files.reduce((arr, file) => {
      const fileName = file.endsWith('.png') ? file.slice(0, file.length - 4) : file;
      arr.push({
        name: fileName,
        base64: encode_base64(`${path}/${file}`),
      })
      return arr;
    }, [])

    fs.writeFile(target, JSON.stringify(result), err => {
      if (err) return console.log(err)
      console.log(`${path} > ${target}`)
    })
  })
}

encode_path('./static/icons/retailers', './src/assets/jsons/retailers.json')
encode_path('./static/icons/brands', './src/assets/jsons/brands.json')
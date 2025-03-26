import { log } from 'console'
import fs, { stat } from 'fs'
import path from 'path'

export function listDirectory(Path: string): void {
  fs.access(Path, (err) => {
    if (err) {
      console.log('Error: dir not found')
    }
    else {
      fs.readdir(Path, (err, names) => {
        if (err) {
          console.log('Error listing the files')
        }
        else {
          console.log('Reading the files')
          names.forEach(name => {
            fs.stat(path.join(Path, `/${name}`), (err, stats) => {
              if (!stats.isDirectory()) {
                console.log(`File name: ${name}`)
                console.log(`Size: ${stats.size}`)
                console.log(`Last modified: ${stats.mtime}`)
              }
            })
          })
        }
      })
    }
  })
}

export function deleteFile(Path: string): void {
  fs.access(path.join(process.cwd(), `/Papelera`), (err) => {
    if (err) {
      fs.mkdir(path.join(process.cwd(), `/Papelera`), (err) => {
        if (err) {
          console.log('Error creating the bin')
        }
      })
    }
    fs.access(Path, (err) => {
      if (err) {
        console.log('Error: file not found')
      }
      else {
        fs.cp(Path, path.join(process.cwd(), `/Papelera`, `${path.basename(Path)}`), (err) => {
        if (err) {
          console.log('Error copyig the file to the bin')
        }
        else {
          fs.rm(Path, (err) => {
            if (err) {
              console.log('Error deleting the file')
            }
            else {
              console.log('File deleted succesfully')
            }
          })
        }
        })
      }
    })
  })
}

export function move(Path: string, newPath: string) {
  fs.access(path.join(process.cwd(), Path), (err) => {
    if (err) {
      console.log('Error: path not found')
    }
    else {
      fs.access(path.join(process.cwd(), `${newPath}`), (err) => {
        if (err) {
          console.log('Dest path not found')
        }
        else {
          fs.cp(path.join(process.cwd(), Path), path.join(process.cwd(), `${newPath}/${path.basename(Path)}`), { recursive: true, force: true }, (err) => {
            if (err) {
              console.log('Error moving')
            }
            else {
              fs.rm(path.join(process.cwd(), Path), { recursive: true, force: true }, (err) => {
                if (err) {
                  console.log('Error deleting')
                }
                else {
                  console.log('Moved succesfully')
                }
              })
            }
          })
        }
      })
    }
  })
}

//listDirectory(path.join(process.cwd(), '/src'))

//deleteFile(path.join(process.cwd(), 'a.txt'))

move(`/Papelera/A`, '.')


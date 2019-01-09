const Case = {
  camel: (str)=>{
    str = str.charAt(0).toLowerCase() + str.slice(1)
    return str.replace(/[-_](.)/g, (m, g)=>g.toUpperCase())
  },
  snake: (str)=>{
    return Case.camel(str).replace(/[A-Z]/g, (s)=>{
      return '_' + s.charAt(0).toLowerCase()
    })
  },
  pascal: (str)=>{
    const camel = Case.camel(str)
    return camel.charAt(0).toUpperCase() + camel.slice(1)
  },
}
export default Case
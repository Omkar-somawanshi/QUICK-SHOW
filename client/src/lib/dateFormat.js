export const dateFormat =(date)=>{
    return new Date(date).toLocaleString('en-us',{
       weekday:'short',
       hour:'numeric',
        month:'long',
        day:'numeric',
        minute:'numeric'
    })
}
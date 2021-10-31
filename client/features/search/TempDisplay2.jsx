import React from 'react';

const TempDisplay2 = (props) => {
  const secondFive = props.data.filter((v, i) => {if(i> 4 && i <=9) {return v} })
  return (
   <div className='temp-container'>
     {secondFive.map((values, i)=>           
        <div key={i} className='temp-sl'>
          <h1>{values.title}</h1>
          <img className='temp' src={values.img_url} alt="" />
          <div className='provider'>
            <img className='provider-thumbnail' src='https://www.themoviedb.org/t/p/original/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg'/>
            <img className='provider-thumbnail' src='https://www.themoviedb.org/t/p/original/aS2zvJWn9mwiCOeaaCkIh4wleZS.jpg'/>
            <img className='provider-thumbnail' src='https://www.themoviedb.org/t/p/original/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg'/>
          </div>
        </div>
     )}
   </div>
  )
}
export default TempDisplay2
import React from 'react';
const Temp = (props) => {
  // console.log(props.data)

  return (
    <div className='temp-container'>
      {props.data.map((values, i)=>
        <div key={values.title} className='temp-sl'>
          <h1>{values.title}</h1>
          <img className='temp' src={values.imgUrl} alt="" />
          <div className='provider'>
            <img className='provider-thumbnail' src='https://www.themoviedb.org/t/p/original/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg'/>
            <img className='provider-thumbnail' src='https://www.themoviedb.org/t/p/original/aS2zvJWn9mwiCOeaaCkIh4wleZS.jpg'/>
            <img className='provider-thumbnail' src='https://www.themoviedb.org/t/p/original/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg'/>
          </div>
        </div>

      )}
    </div>
  );
};

export default Temp;



// id: Number,
// suggested: Array,
// trending: Array,
// history: Array,
// mediaType: String,
// title: String,
// summary: String,
// reviews: [ReviewSchema],
// imgUrl: String,
// hulu: String,
// disneyPlus: String,
// netflix: String,
// hboMax: String,
// appleTvPlus: String,
// amazonPrimeVideo: String


// username: String,
// rating: Number,
// date: {type: Date, default: Date.now},
// content: String
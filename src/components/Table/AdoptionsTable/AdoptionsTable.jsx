import { doc } from 'firebase/firestore'
import React from 'react'
import animalImages from "../../../Data/animalImages";

export default function AdoptionsTable({applications}) {


  // const animalImage = animalImages[application.animalImage];


  return (
    <div>
      {applications.map((application)=>{
          return(
            <div key={application.id}>
              <p>{application.applicantName}</p>
            </div>
          )
      })}
    </div>
  )
}

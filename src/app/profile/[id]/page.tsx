'use client'
import React from "react"

const nestedProfilePage = ({params}:{ params: {id:string}}) => {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>profile page</h1>
            <h2 className="p-3 bg-green-500 rounded text-black">{params.id}</h2>
        </div>
    )
}

export default nestedProfilePage;



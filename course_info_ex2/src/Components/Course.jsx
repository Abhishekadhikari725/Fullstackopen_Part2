import React from "react";

const Header =({text}) =>{
    return (
        <h3>
        {text}
        </h3>
    )
}

const Total =({parts}) =>{
    return(
        <div>
            <b>
            total of {parts.reduce((sum,part) => sum+part.exercises,0)} exercises
            </b>
        </div>
    )
}

const Part =({text,exercises}) =>{
    return(
        <p>
        {text} {exercises}
        </p>
    )
}

const Content=({parts}) =>{
    return(
        <div>
            {parts.map(part=>
                <Part key={part.id} text={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Course =({course}) =>{
    return(
        <>
        <Header  text={course.name} />
        <Content key={course.id} parts={course.parts} />
        <Total parts={course.parts} />
        </>
    )
}

export default Course;
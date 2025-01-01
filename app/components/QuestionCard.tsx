"use client";
import React from 'react'
import { useState } from 'react'
import { Pagination } from '@mui/material'
interface Question {
    "S.No": number,
    "Name": string,
    "Rating": number
}
const QuestionCard = () => {
    let data:Question[] = [
        { "S.No": 1, "Name": "Hello 2025", "Rating": 800 },
        { "S.No": 2, "Name": "World 2025", "Rating": 850 },
        { "S.No": 3, "Name": "Next.js Summit", "Rating": 900 },
        { "S.No": 4, "Name": "React Fest", "Rating": 750 },
        { "S.No": 5, "Name": "Node.js Meetup", "Rating": 820 },
        { "S.No": 6, "Name": "CodeForce Battle", "Rating": 880 },
        { "S.No": 7, "Name": "LeetCode Jam", "Rating": 890 },
        { "S.No": 8, "Name": "GeeksForGeeks Event", "Rating": 920 },
        { "S.No": 9, "Name": "OpenAI Forum", "Rating": 940 },
        { "S.No": 10, "Name": "Hackathon 2025", "Rating": 980 },
        { "S.No": 11, "Name": "ML Bootcamp", "Rating": 910 },
        { "S.No": 12, "Name": "AI Workshop", "Rating": 960 },
        { "S.No": 13, "Name": "Cloud Conference", "Rating": 820 },
        { "S.No": 14, "Name": "Data Science Meetup", "Rating": 880 },
        { "S.No": 15, "Name": "CyberSec Summit", "Rating": 900 },
        { "S.No": 16, "Name": "Startup Launch", "Rating": 850 },
        { "S.No": 17, "Name": "Tech Symposium", "Rating": 870 },
        { "S.No": 18, "Name": "UI/UX Bootcamp", "Rating": 780 },
        { "S.No": 19, "Name": "Flutter Fest", "Rating": 810 },
        { "S.No": 20, "Name": "Python Meetup", "Rating": 930 },
        { "S.No": 21, "Name": "JavaScript Conference", "Rating": 940 },
        { "S.No": 22, "Name": "Angular Workshop", "Rating": 860 },
        { "S.No": 23, "Name": "Rust Hackathon", "Rating": 950 },
        { "S.No": 24, "Name": "Django Event", "Rating": 890 },
        { "S.No": 25, "Name": "Kubernetes Day", "Rating": 970 },
        { "S.No": 26, "Name": "DevOps Meetup", "Rating": 810 },
        { "S.No": 27, "Name": "Blockchain Hackathon", "Rating": 910 },
        { "S.No": 28, "Name": "Quantum Computing Talk", "Rating": 940 },
        { "S.No": 29, "Name": "IoT Summit", "Rating": 890 },
        { "S.No": 30, "Name": "Game Dev Meetup", "Rating": 870 }
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    return (
        <div>
            <div className='w-full flex flex-col'>
                <div className='w-full flex justify-between px-6 font-bold gap-x-4 h-14 items-center border-b-2'>
                    <div className='w-fit'>S.No.</div>
                    <div className='w-3/5 px-6'>Name</div>
                    <div className='w-1/5'>Rating</div>
                </div>
                <div className='w-full h-fit flex flex-col'>
                    {currentItems.map((item, index) =>
                    <div key={index} className='w-full flex justify-between px-6 gap-x-10 h-8 items-center cursor-pointer my-2'>
                        <div className='w-fit'>{item["S.No"]}</div>
                        <div className='w-3/5 px-6'>{item["Name"]}</div>
                        <div className='w-1/5'>{item["Rating"]}</div>
                    </div>)}
                </div>
            </div>
            <div className='flex justify-center py-4'>
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            </div>
        </div>
    )
}

export default QuestionCard
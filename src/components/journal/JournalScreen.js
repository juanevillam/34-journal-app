import React from 'react';
import { Sidebar } from './Sidebar';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { useSelector } from 'react-redux';


export const JournalScreen = () => {

    const { active } = useSelector( state => state.notes );


    return (
        <div 
            className="journal__main-content animate__animated animate__fadeIn animate__faster"
        >
            
            <Sidebar />


            <main className="animate__animated animate__fadeIn animate__faster">

                {
                    ( active ) 
                        ? ( <NoteScreen /> )
                        : ( <NothingSelected /> )
                }

            </main>


        </div>
    )
}

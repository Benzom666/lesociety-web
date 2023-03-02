import React, { useState } from 'react'
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: "30px",
        background: 'linear-gradient(231.4deg, rgba(46, 49, 58, 0.80844) 18.16%, rgba(25, 25, 25, 0.831845) 95.56%)',
    },
    
};

const CreatedatesWarningPopUp = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='warning_modal_main'>
                    <div className='w-15 text-end pe-1'>
                        <IoIosClose
                            className="mouse-point"
                            size={33}
                            onClick={closeModal}
                        />
                    </div>
                    <div className='WarnigPopUp_Heading'>
                        <h2>Any content that contains the </h2>
                        <h2>following will be removed</h2>
                    </div>
                    <div className='list-of-warning'>
                        <ul>
                            <li>Escorting/Prostitution</li>
                            <li>Personal Contact Info</li>
                            <li>Commercial Activity</li>
                            <li>Criminal Activity</li>
                            <li>Scamming</li>
                        </ul>
                        <div className='dont-show'>
                            <input type="checkbox" />
                            <p className='dont-show-text'>Don’t show this again.</p>
                        </div>
                    </div>
                    <div className='warning_modal_footer'>
                        <button type="button">Agree and Continue</button>
                        <p className='footer-text-war'>No Refunds will be Issued</p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CreatedatesWarningPopUp;
import React, { useState } from 'react'
import AuthEntryBox from '../components/AuthEntryBox'
import AuthButton from '../components/AuthButton'
import AuthBox from '../components/AuthBox'

interface InternAccountModalProps {
    onClose: () => void
}

const authEntryBoxStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20px',
    width: '375px',
    padding: '27px'
}

const InternAccountModal: React.FC<InternAccountModalProps> = ({ onClose }) => {
    return (
        <div
            style={{
                position: 'fixed',
                height: "100%",
                width: "100%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.5)'
            }}
        >
            <AuthBox prop={<InternAccountModalContent onClose={onClose} />} />
        </div>
    )
}

const InternAccountModalContent: React.FC<InternAccountModalProps> = ({ onClose }) => {

    const [internName, setInternName] = useState('')
    const [internEmail, setInternEmail] = useState('')

    const signUpIntern = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const createInternAccount = await fetch('api/auth/createInternAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ internName: internName, internEmail: internEmail })
        })

        if (!createInternAccount.ok) {
            const errorData = await createInternAccount.json();
            console.log(errorData)
            if (typeof errorData.error !== "string") {
                alert(errorData.error.errors[0].longMessage)
                console.error('Signup error', errorData.error.errors[0].longMessage)
            }
            else {
                alert(errorData.error)
                console.error('Singup error', errorData.error)
            }
            return;
        }

        onClose();


    }
    return (
        <div>
            <h1
                style={{
                    textAlign: 'center',
                    fontSize: '25px',
                    fontWeight: 'bold',
                    color: 'black',
                    paddingBottom: '5px',
                    marginTop: '-19px'
                }}
            >
                Intern Signup
            </h1>
            <h2
                style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'black',
                    paddingBottom: '10px'
                }}
            >
                User Credentials
            </h2>
            <div style={authEntryBoxStyle}>
                <AuthEntryBox
                    placeholder="intern name"
                    type="text"
                    onChange={(e) => { setInternName(e.target.value) }}
                ></AuthEntryBox>
            </div>
            <div style={authEntryBoxStyle}>
                <AuthEntryBox
                    placeholder="email"
                    type="email"
                    onChange={(e) => { setInternEmail(e.target.value) }}
                ></AuthEntryBox>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                paddingTop: "75px"
            }}>
                <AuthButton
                    color='#43b4ef'
                    filled={true}
                    text='Sign Up'
                    href="/signupConfirmation"
                    onClick={(e) => signUpIntern(e)} />
            </div>

        </div>
    )
}


export default InternAccountModal;
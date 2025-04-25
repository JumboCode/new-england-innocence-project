// import React, { useState } from 'react'
// import AuthEntryBox from '../components/AuthEntryBox'
// import AuthButton from '../components/AuthButton'
// import AuthBox from '../components/AuthBox'
// // import { useRouter } from 'next/router'
// // import { useSignUp } from "@clerk/nextjs"
// import { v4 as uuidv4 } from "uuid"
// import dotenv from "dotenv";



// const modalOverlay: React.CSSProperties = {
//   position: "fixed",
//   width: '375px',
//   height: '360px',
//   background: 'rgb(0,0,0,0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   zIndex: '100'
// }

// const modalContent: React.CSSProperties = {
//   position: "relative",
//   width: '75%',
//   height: '42%',
//   backgroundColor: 'rgba(255, 255, 255, 1)',
//   padding: '20px',
//   border: '1px solid #B6B5B5',
//   zIndex: "101",
// }

// const buttonStyle: React.CSSProperties = {
//   backgroundColor: "#43b4ef",
//   color: "white",
//   border: `2px solid #43b4ef`,
//   borderRadius: '50px',
//   fontWeight: 'bold',
//   fontSize: '14px',
//   fontFamily: 'Arial, sans-serif',
//   cursor: 'pointer',
//   textAlign: 'center',
//   transition: 'background-color 0.3s ease',
//   height: '25px',
//   width: '115px',
// };



// const Signup: React.FC = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         backgroundColor: '#f4f4f4',
//       }}
//     >
//       <AuthBox prop={<SignupContent />} />
//     </div>
//   )
// }

// const SignupContent = () => {
//   dotenv.config();
//   // const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [password, setPassword] = useState('')
//   const [openVerificationModal, setOpenVerificationModal] = useState(false)
//   const [userVerificationCode, setUserVerificationCode] = useState('')
//   // const { isLoaded, signUp } = useSignUp() // Clerk
//   const [generatedVerificationCode, setGeneratedVerificationCode] = useState<string | null>(null);

//   //if(!isLoaded) {return null}; //Clerk

//   const VerificationCodeModal: React.FC = () => {
//     console.log(openVerificationModal)
//     return (
//       <div style={modalOverlay}>
//         <div style={modalContent}>
//           <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={() => {
//             setUserVerificationCode('');
//             setOpenVerificationModal(false);
//           }}>X</div>
//           <label>Please enter the verification code sent to your email</label>
//           <input type="text" value={userVerificationCode} style={{ border: '1px solid #000', borderRadius: '50px' }} onChange={(e) => { console.log(e.target.value); setUserVerificationCode(e.target.value) }} autoFocus />
//           <br></br>
//           <div style={{ display: "flex", justifyContent: 'space-between', marginTop: "5px" }}>
//             <button
//               style={buttonStyle}
//               onClick={async () => {
//                 // const signup = await signUp.attemptEmailAddressVerification({ code: userVerificationCode })
//                 // if (signup.status == "complete") {
//                 //   setOpenVerificationModalfalse)
//                 //   await handleSignup();
//                 //   return;
//                 // } //Clerk

//                 if (userVerificationCode == generatedVerificationCode) {
//                   console.log("user entered correct code");
//                   setOpenVerificationModal(false);
//                   await handleSignup();
//                   return;
//                 }

//                 alert("The verification code is not correct.")
//               }}>Submit</button>
//             <button style={buttonStyle} onClick={async (e) => { await generateCode(e) }} >Resend Code</button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const generateCode = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     event.preventDefault()
//     if (!firstName || !lastName || !email || !password) {
//       alert("Please enter you name, email, and password")
//       return;
//     }
//     console.log("generating code")
//     const code = uuidv4().slice(0, 6);
//     setGeneratedVerificationCode(code)
//     setOpenVerificationModal(true)
//     const responseEmail = await fetch('/api/auth/sendEmail', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email: email, verificationCode: code })
//     });

//     if (!responseEmail.ok) {
//       const errorDataEmail = await responseEmail.json();
//       alert(errorDataEmail.error);
//       console.error("Signup error", errorDataEmail.error);
//       return;
//     }


//     // const result = await signUp.create({
//     //   strategy: "password",
//     //   emailAddress: email,
//     //   password: password,
//     // }) //Clerk



//     // if (result.status && result.status == "needs_verification" as SignUpStatus) {
//     //   console.log("entered hereee")
//     //   await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
//     //   setOpenVerificationModal(true)
//     // } //Clerk


//   }

//   const handleSignup = async () => {
//     try {
//       if (!firstName || !lastName || !email || !password) {
//         alert("Please enter you name, email, and password")
//         return;
//       }
//       else {
//         console.log("handling signup")

//         // added to make sure signup doesn't fail silently
//         const responseSignup = await fetch('/api/auth/signup', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             email,
//             firstName,
//             lastName,
//             password
//           })
//         })

//         console.log(responseSignup)

//         if (!responseSignup.ok) {
//           console.log("signup didnt work")
//           const errorDataSignup = await responseSignup.json()
//           console.log(errorDataSignup)
//           if (typeof errorDataSignup.error !== "string") {
//             alert(errorDataSignup.error.errors[0].longMessage)
//             console.error('Signup error', errorDataSignup.error.errors[0].longMessage)
//           }
//           else {
//             alert(errorDataSignup.error)
//             console.error('Signup error', errorDataSignup.error)
//           }

//           return;
//         }

//         alert('Signup successful!')
//         // router.push('/signupConfirmation'); // Navigate only after success
//       }

//     } catch (error: any) {
//       console.error(error.error)
//     }
//   }

//   return (

//     <div>
//       {openVerificationModal &&
//         (<VerificationCodeModal />)}
//       <div>
//         {/* Sign up text */}
//         <h1
//           style={{
//             textAlign: 'center',
//             fontSize: '25px',
//             fontWeight: 'bold',
//             color: 'black',
//             paddingBottom: '5px',
//             marginTop: '-19px'
//           }}
//         >
//           Signup
//         </h1>
//       </div>

//       <div>
//         {/* User credentials text */}
//         <h2
//           style={{
//             textAlign: 'center',
//             fontSize: '18px',
//             fontWeight: 'bold',
//             color: 'black',
//             paddingBottom: '10px'
//           }}
//         >
//           User Credentials
//         </h2>
//       </div>

//       {/* email input */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '20px',
//           width: '375px',
//           padding: '27px'
//         }}
//       >
//         <AuthEntryBox
//           placeholder='Email'
//           type='email'
//           onChange={e => setEmail(e.target.value)}
//         />
//       </div>

//       {/* position input */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '20px',
//           width: '375px',
//           padding: '27px'
//         }}
//       >
//         <AuthEntryBox
//           placeholder='First Name'
//           type='text'
//           onChange={e => setFirstName(e.target.value)}
//         />
//       </div>

//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '20px',
//           width: '375px',
//           padding: '27px'
//         }}
//       >
//         <AuthEntryBox
//           placeholder='Last Name'
//           type='text'
//           onChange={e => setLastName(e.target.value)}
//         />
//       </div>

//       {/* password input */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '20px',
//           width: '375px',
//           padding: '27px'
//         }}
//       >
//         <AuthEntryBox
//           placeholder='Password'
//           type='password'
//           onChange={e => setPassword(e.target.value)}
//         />
//       </div>

//       {/* sign up button */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: '10px'
//         }}
//       >
//         <AuthButton
//           color='#43b4ef'
//           filled={true}
//           text='Sign Up'
//           href="/signupConfirmation"
//           onClick={(e) => generateCode(e)}

//         />
//       </div>
//     </div>
//   )
// }

// export default Signup;


import React, { useState } from 'react'
import AuthEntryBox from '../components/AuthEntryBox'
import AuthButton from '../components/AuthButton'
import AuthBox from '../components/AuthBox'
import dotenv from "dotenv"

const Signup: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
      }}
    >
      <AuthBox prop={<SignupContent />} />
    </div>
  )
}

const SignupContent = () => {
  dotenv.config()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    try {
      if (!firstName || !lastName || !email || !password) {
        alert("Please enter your name, email, and password")
        return
      }

      const responseSignup = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password
        })
      })

      if (!responseSignup.ok) {
        const errorDataSignup = await responseSignup.json()
        if (typeof errorDataSignup.error !== "string") {
          alert(errorDataSignup.error.errors[0].longMessage)
          console.error('Signup error', errorDataSignup.error.errors[0].longMessage)
        } else {
          alert(errorDataSignup.error)
          console.error('Signup error', errorDataSignup.error)
        }
        return
      }

      alert('Signup successful!')
      // router.push('/signupConfirmation')
    } catch (error: any) {
      console.error(error.error)
    }
  }

  return (
    <div>
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
          Signup
        </h1>
      </div>

      <div>
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
      </div>

      {/* email input */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20px',
          width: '375px',
          padding: '27px'
        }}
      >
        <AuthEntryBox
          placeholder='Email'
          type='email'
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      {/* first name input */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20px',
          width: '375px',
          padding: '27px'
        }}
      >
        <AuthEntryBox
          placeholder='First Name'
          type='text'
          onChange={e => setFirstName(e.target.value)}
        />
      </div>

      {/* last name input */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20px',
          width: '375px',
          padding: '27px'
        }}
      >
        <AuthEntryBox
          placeholder='Last Name'
          type='text'
          onChange={e => setLastName(e.target.value)}
        />
      </div>

      {/* password input */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20px',
          width: '375px',
          padding: '27px'
        }}
      >
        <AuthEntryBox
          placeholder='Password'
          type='password'
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      {/* sign up button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px'
        }}
      >
        <AuthButton
          color='#43b4ef'
          filled={true}
          text='Sign Up'
          href="/signupConfirmation"
          onClick={(e) => {
            e.preventDefault()
            handleSignup()
          }}
        />
      </div>
    </div>
  )
}

export default Signup

import React, { useEffect } from 'react'
import GoogleLogin  from 'react-google-login'
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import Logo from '../assets/logowhite.png'
import { client } from '../client'


const Login = () => {
  const navigate = useNavigate()
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj))
    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl
    }

    client.createIfNotExists(doc).then(() => {navigate('/', { replace: true })})
  }
  // useEffect(() => {
  //   const initClient = () => {
  //     gapi.client.init({
  //       clientId: `${process.env.REACT_APP_GOOGLE_API_TOKEN}`,
  //       scope: '',
  //     });
  //   };
  //   gapi.load('client:auth2', initClient);
  // });
  return (
    <div className='flex flex-col items-center justify-start h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop={true}
          controls={false}
          muted={true}
          autoPlay
          className='object-cover w-full h-full'
        />
        <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-blackOverlay'>
          <div className='p-5'>
            <img src={Logo} alt='logo' width='130px' />
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className='flex items-center justify-center px-4 py-2 text-black rounded-lg outline-none cursor-pointer bg-mainColor'
                >
                  <FcGoogle className='mr-4' /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
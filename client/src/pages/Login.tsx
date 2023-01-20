import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import PreLoader from '../components/PreLoader'
import useDocumentTitle from "../components/useDocumentTitle";


function Login() {
  useDocumentTitle("Login")
const [formData, setFormData] = useState({
    name: '',
    password: '',
})

const { name, password } = formData

const navigate = useNavigate()
const dispatch = useDispatch<any>()

const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
)

useEffect(() => {
    if (isError) {
    toast.error(message)
    }

    if (isSuccess || user) {
    navigate('/')
    navigate(0)
    }

    dispatch(reset())
}, [user, isError, isSuccess, message, navigate, dispatch])

const onChange = (e: any) => {
    setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
    }))
}

const onSubmit = (e: any) => {
    e.preventDefault()

    const userData = {
    name,
    password,
    }

    dispatch(login(userData))
}

if (isLoading) {
    return <PreLoader />
}

return (
    <>
    <div className="movie-items" style={{height: "100vh"}}>
        <div className='auth-header'>
            <h1 style={{fontSize: "40px"}}>Login</h1>
        </div>
        <section className='form'>
            <form onSubmit={onSubmit}>
            <div className='form-group'>
                <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={name}
                placeholder='Enter your email'
                onChange={onChange}
                />
            </div>
            <div className='form-group'>
                <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Enter password'
                onChange={onChange}
                />
            </div>

            <div className='form-group'>
                <button type='submit' className='btn btn-block'>
                Submit
                </button>
            </div>
            </form>
        </section>
        <div className='auth-header'>
            <h5>Don't Have Account? Sign Up <a href="/register">Here</a></h5>
        </div>
    </div>
    </>
)
}

export default Login
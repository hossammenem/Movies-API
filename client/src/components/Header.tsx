import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

function Header(){ 
    const { user } = useSelector(
        (state: any) => state.auth
    )
    const [title, setTitle] = useState("")

    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    function onLogout() {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    
    async function searchForMovieHandler(e: any){
      e.preventDefault()
      navigate(`/search-results/${title}`)
    }

    return( 
    <header className="ht-header">
        <div className="container">
            <nav className="navbar navbar-default navbar-custom">
                <div className="navbar-header logo">
                    <div className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <div id="nav-icon1">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                    <div className="collapse navbar-collapse flex-parent" 
                            id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav flex-child-menu menu-left">
                        </ul>

          {user ?
              <ul className="nav navbar-nav flex-child-menu menu-right">
                  { window.location.pathname.includes('watchlist') ?
                  <li className="login"><a href="/">Home</a></li>
                  :
                  <li className="login"><a href={`/watchlist/${user.id}`}>Watchlist</a></li>
                  }
                  <li className="btn" style={{background: "none", border: "none"}}>
                  <button className="btn" style={{border: "none"}} 
                  onClick={onLogout}>Log Out</button></li>
              </ul> :
              <ul className="nav navbar-nav flex-child-menu menu-right">
                  <li className="login"><a href="/login">Log in</a></li>
                  <li className="btn" style={{background: "none", border: "none"}}>
                  <a href="/register">sign up</a></li>
              </ul>
          }
      </div>
            </nav>
            
            <form onSubmit={searchForMovieHandler}>
                <div className="top-search">
                    <input type="text" value={title} 
                    placeholder="Search for a movie or TV Show that you are looking for" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTitle(e.target.value);
                    }}
                    />
                </div>
            </form>
        </div>
    </header>
    );
}

export default Header;
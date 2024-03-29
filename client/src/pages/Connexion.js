import React, { useState, useEffect  } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { useGlobalContext } from '../app/context';
const registerData = {name:'', lastname:'', pseudo:'', email:'', password:'',confirmPassword:'', userType:'particulier'}
const loginDatas = {email:'', password:''}


const Connexion = () => {
    let location = useLocation();
    const {userAuthenticated, register, login} = useGlobalContext();
    let navigate = useNavigate();
    const [formData, setFormData] = useState(registerData);
    const [loginData, setLoginData] = useState(loginDatas);
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    let cgv = document.getElementById('cgv');
    let cgvInfo = document.getElementById('cgvInfo');
    let charteCommu = document.getElementById('charteCommu');
    let charteCommuInfo = document.getElementById('charteCommuInfo');
    let passwordConfirmInfo = document.getElementById('passwordConfirmInfo');

    const handleChange =(e) =>{
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handelRadioBtn = (e) =>{
        setFormData({...formData, userType: e.target.value })
    }

    const handelConnexion = ()=>{
        setIsUserRegistered(true);
    }
    const handelRegisterForm =(e)=>{
        e.preventDefault();
        cgvInfo.classList.add('hidden')
        charteCommuInfo.classList.add('hidden')
        passwordConfirmInfo.classList.add('hidden')
        if(!cgv.checked){
            return cgvInfo.classList.remove('hidden')
        }
        if(!charteCommu.checked){
           return charteCommuInfo.classList.remove('hidden')
        }
        if(formData.password !== formData.confirmPassword ){
            return passwordConfirmInfo.classList.remove('hidden')
        }else {
            register(formData);
        }
    }

    const handleAuthChange =(e) =>{
        setLoginData({...loginData, [e.target.name]: e.target.value })
    }
    const handelConnexionForm =(e)=>{
        e.preventDefault();
        login(loginData);
    }

    useEffect(() => {
        if (location.pathname == '/connexion') setIsUserRegistered(true)

        if (location.pathname !== '/connexion')setIsUserRegistered(false)
    }, [location]);
        
    useEffect(() => {
    if (userAuthenticated){
        return navigate("/liste_des_actions");
    }},[userAuthenticated]);


    useEffect(() => {
        if (userAuthenticated){
            return navigate("/profil", {otherParam: 'fromConnexion'});
        }},[login, register]);
 
    if(!isUserRegistered){
        return(
            <div className="w-full flex flex-row justify-around">
                <section className="flex-col items-center w-2/5 my-5 hidden md:flex">
                    <img src="./logoTB.png" alt="back to home page" className="w-[360px]"/>
                    <div className="bg-hero w-full h-[800px] lg:bg-cover md:bg-no-repeat ">
                    </div>
                </section>
                <section id="inscriptionBloc" className="w-full md:w-[450px] my-5 mx-0 md:mx-20 border-4 border-greenV2 flex justify-center flex-col rounded-2xl formShadow p-4">
                <div className="w-full mb-4">
                    <h2 className="text-2xl text-greenV2 font-bold text-center">Je m'inscris !</h2>
                    <div className="w-full h-1 border-b-2 border-greenV2" id="underline"></div>
                </div>
                <form className="flex flex-col w-full" onSubmit={handelRegisterForm}>
                    <div className="mx-0 md:mx-6 mb-2 px-0 md:px-4 py-1 flex flex-col">
                        <label htmlFor="lastname" className="bg-greenV2 text-white w-[200px] mb-1 px-1">Nom</label>
                        <input type="text" autoComplete="off" name="lastname" id="lastname" className="border-2 border-greenV2 leading-normal w-[250px] md:w-[300px]" value={formData.lastname} onChange={handleChange} required/>
                    </div>
                    <div className="mx-0 md:mx-6 mb-2 px-0 md:px-4 py-1 flex flex-col">
                        <label htmlFor="name" className="bg-greenV2 text-white w-[200px] mb-1 px-1">Prénom</label>
                        <input type="text" autoComplete="off" name="name" id="name" className="border-2 border-greenV2 leading-normal w-[250px] md:w-[300px]" value={formData.name} onChange={handleChange} required/>
                    </div>
                    <div className="mx-0 md:mx-6 mb-2 px-0 md:px-4 py-1 flex flex-col">
                        <label htmlFor="pseudo" className="bg-greenV2 text-white w-[200px] mb-1 px-1">Pseudo</label>
                        <input type="text" autoComplete="off" name="pseudo" id="pseudo" className="border-2 border-greenV2 leading-normal w-[250px] md:w-[300px]" value={formData.pseudo} onChange={handleChange} required/>
                    </div>                
    
                    <div className="mx-0 md:mx-6 mb-2 px-0 md:px-4 py-1 flex flex-col">
                        <label htmlFor="email" className="bg-greenV2 text-white w-[200px] mb-1 px-1">Email</label>
                        <input type="email" autoComplete="off" name="email" id="email" className="border-2 border-greenV2 leading-normal w-[250px] md:w-[300px]" value={formData.email} onChange={handleChange} required/>
                    </div>
                    <p id="emailInfo" className='hidden mx-6 px-4 text-red-900 text-sm'>Merci de renseigner un email valide.</p>
                    <div className="mx-0 md:mx-6 mb-2 px-0 md:px-4 py-1 flex flex-col">
                        <label htmlFor="password" className="bg-greenV2 text-white w-[200px] mb-1 px-1">Mot de passe</label>
                        <input type="password" autoComplete="off" name="password" id="password" className="border-2 border-greenV2 leading-normal w-[250px] md:w-[300px]" value={formData.password} onChange={handleChange} required/>
                    </div>            
                    
                    <div className="mx-0 md:mx-6 mb-2 px-0 md:px-4 py-1 flex flex-col">
                        <label htmlFor="confirmPassword" className="bg-greenV2 text-white w-[200px] mb-1 px-1">Confirmez le mot de passe</label>
                        <input type="password" autoComplete="off" name="confirmPassword" id="confirmPassword" className="border-2 border-greenV2 leading-normal w-[250px] md:w-[300px]" value={formData.confirmPassword} onChange={handleChange} required/>
                    </div>
                    <p id="passwordConfirmInfo" className='hidden mx-6 px-4 text-red-900 text-sm'>Le mot de passe et la confirmation de mot de passe ne sont pas identiques.</p>
                    
                    <fieldset className="mx-0 md:mx-6 mb-2 px-0 md:px-4 py-1 flex flex-col">
                        <legend className="bg-greenV2 text-white w-[200px] mb-1 px-1">Catégorie d'utilisateur</legend>
                        <div className="flex justify-start" onChange={handelRadioBtn}>
                            <div className="mr-2">
                                <input type="radio" name="catergoy" id="particulier" defaultChecked value="particulier" className='mr-2'/>
                                <label htmlFor="catergoy">Particulier</label>
                            </div>
                            <div className="mr-2" >
                                <input type="radio" name="catergoy" id="ecole" value="ecole" className='mr-2'/>
                                <label htmlFor="catergoy">Ecole</label>
                            </div>
                            <div>
                                <input type="radio" name="catergoy" id="association" value="association" className='mr-2'/>
                                <label htmlFor="catergoy">Association</label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="flex flex-row text-greenV2 font-bold mx-0 md:mx-6 mb-2 w-fit px-0 md:px-4 py-2">
                        <div  className="mr-2">
                            <input type="checkbox" id="charteCommu" name="charteCommu"/>
                        </div>
                        <div>
                            <legend>J'ai pris connaissance de la charte d'engagement de Trash Buster</legend>
                        </div>
                    </fieldset>
                    <p id="charteCommuInfo" className='hidden mx-6 px-4 text-red-900 text-sm'>L'acceptation de la charte d'engagement de Trash Buster obligatoire</p>
                    <fieldset className="flex flex-row text-greenV2 font-bold mx-0 md:mx-6 mb-2 w-fit px-0 md:px-4 py-2">
                        <div className="mr-2">
                            <input type="checkbox" id="cgv" name="cgv"/>
                        </div>
                        <div>                    
                            <legend>Accepter les conditions générales d'utilisation du site</legend>
                        </div>
                    </fieldset>
                    <p id="cgvInfo" className='hidden mx-6 px-4 text-red-900 text-sm'>Les conditions générales d'utilisation sont obligatoires</p>
                    <button className="rounded-full m-4 p-2 bg-greenV2 text-white cursor-pointer btnInscription shadow-lg border-greenGrass border-r-4 border-b-4" type="submit">S'inscrire</button>
                    <p className='text-xl ml-4 mt-4 pt-2 '>Je dispose déjà d'un compte: </p>
                    <button className="border rounded-full m-4 p-2 bg-greenApple text-white cursor-pointer btnInscription shadow-lg border-greenGrass border-r-4 border-b-4" onClick={handelConnexion}>Se connecter</button>
                </form>
                </section>
                {/* {errorModal && <ErrorModal />} */}
            </div>
            
        )
    }

    return (
        <div className="w-full flex flex-row justify-around">
            <section id="inscriptionBloc" className="w-10/12 sm:w-6/12 md:w-[450px] my-20 md:my-40 mx-0 md:mx-20 border-4 border-greenApple flex justify-center align-start flex-col rounded-2xl formShadow p-4">
                <div className="w-full mb-4">
                    <h2 className="text-2xl text-greenApple font-bold text-center">Je me connecte ! </h2>
                    <div className="w-full h-1 border-b-2 border-greenApple" id="underline"></div>
                </div>
                <form className="flex flex-col w-full" onSubmit={handelConnexionForm}>
                    <div className="mx-0 md:mx-6 mb-2 px-0 md:px-4 py-1 flex flex-col">
                        <label htmlFor="email" className="bg-greenApple text-white w-[200px] mb-1 px-1">Email de votre compte</label>
                        <input type="email" autoComplete="off" name="email" id="email" className="border-2 border-greenApple leading-normal w-[250px] md:w-[300px]" value={loginData.email} onChange={handleAuthChange} required/>
                    </div>
                    <div className="mx-0 md:mx-6 mb-2 px-0 md:px-4 py-1 flex flex-col">
                        <label htmlFor="password" className="bg-greenApple text-white w-[200px] mb-1 px-1">Mot de passe</label>
                        <input type="password" autoComplete="off" name="password" id="password" className="border-2 border-greenApple leading-normal w-[250px] md:w-[300px]" value={loginData.password} onChange={handleAuthChange} required/>
                    </div>
                    <button className="rounded-full m-4 p-2 bg-greenApple text-white cursor-pointer btnInscription shadow-lg border-greenGrass border-r-4 border-b-4" type="submit">Se connecter</button>  
                </form>
            </section>
            <section className="hidden md:flex flex-col items-center w-2/5 my-5">
                <img src="./logoTB.png" alt="back to home page" className="w-[360px]"/>
                <div className="bg-hero w-full h-[590px] bg-cover"></div>
            </section>
            {/* {errorModal && <ErrorModal />} */}
        </div>
    );
};

export default Connexion;
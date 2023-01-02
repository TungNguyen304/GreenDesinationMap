import { TbGitPullRequestClosed } from 'react-icons/tb'
import {BsCheckCircleFill} from 'react-icons/bs'
import { useDispatch } from 'react-redux/es/exports'
import { useSelector } from 'react-redux/es/exports'
import { setServiceType } from '../../../store/actions/service'
import NavItem from './NavItem';
import Left from '../../common/Left'
import Right from '../../common/Right'
import { useValueContext } from '../../../hook'
import { useEffect, useRef } from 'react'
import style from './navbar.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function Navbar(props) {
    const {handleSetBigBox, handleDisplayBigBox} = useValueContext()
    const dispatch = useDispatch()
    const checkRef = useRef()
    const filterRef = useRef()
    const left = useRef()
    const right = useRef()
    const navbar = useRef()
    const serviceType = useSelector(state => state.serviceReducer.serviceComponent)
    const filter = useSelector(state => state.filterReducer.filter)
    

    let navList, navlistChild
    useEffect(() => {
        (() => {
            navList = document.querySelectorAll(`.${style.navlist} li`)
            navlistChild = document.querySelectorAll(`.${style.navlist} li div`)
            left.current.addEventListener('click', handleSlideLeft)
            right.current.addEventListener('click', handleSlideRight)
            navlistChild[0].classList.add(style.active)
        })();

        (() => {
            const list = [...navlistChild]
            list.forEach((item) => {
                
                item.addEventListener('click', () => {
                    const typeService = item.getAttribute('type')
                    dispatch(setServiceType(typeService))
                    list.forEach((item) => {
                        item.classList.remove(style.active)
                    })
                    item.classList.add(style.active)
                })
            })
        })();

        (() => {
            window.onscroll = function () {  
                if (window.pageYOffset > 0) {
                    navbar.current.style.marginTop = '0px'
                    navbar.current.style.borderBottom = '1px solid #DDDDDD'
                    navbar.current.style.boxShadow = 'rgb(0 0 0 / 16%) 0 0 6px'
                } else {
                    navbar.current.style.marginTop = '20px'
                    navbar.current.style.borderBottom = 'unset'
                    navbar.current.style.boxShadow = 'unset'
                }
            };
        })();

        return () => {
            window.onscroll = () => {}
        }
    }, [navList])

    useEffect(() => {
        if((filter.district && filter.district.length) || (filter.ward && filter.ward.length) || (filter.type && filter.type.length)) {
            checkRef.current.classList.remove('hidden')
            filterRef.current.style.border = '1px solid green'
        }
        else {
            checkRef.current.classList.add('hidden')
            filterRef.current.style.border = ''
        }
    }, [filter])

    function handleSlideRight() {
        let width = navList && Number((window.getComputedStyle(navList[0]).width).slice(0, (window.getComputedStyle(navList[0]).width).length-2))
        let sum = width*2
        let marginLeft = navList && (Number((window.getComputedStyle(navList[0]).marginLeft).slice(0, (window.getComputedStyle(navList[0]).marginLeft).length-2)))
        if(marginLeft !== -(navList.length-12)*(sum/2)) {
            if(marginLeft === 0) {
                navList[0].style.marginLeft = `${-sum}px`
            }
            else {
                navList[0].style.marginLeft = String(marginLeft - sum) + 'px'
            }
        }
        else {
            navList[0].style.marginLeft = `0px`
        }

        right.current.removeEventListener('click', handleSlideRight)

        setTimeout(() => {
            right.current.addEventListener('click', handleSlideRight)
        }, 800)
    }

    function handleSlideLeft() {
        let width = navList && Number((window.getComputedStyle(navList[0]).width).slice(0, (window.getComputedStyle(navList[0]).width).length-2))
        let sum = width*2
        let marginLeft = navList && (Number((window.getComputedStyle(navList[0]).marginLeft).slice(0, (window.getComputedStyle(navList[0]).marginLeft).length-2)))
        if(marginLeft !== 0) {
            navList[0].style.marginLeft = `${marginLeft + sum}px`
        }
        else {
            navList[0].style.marginLeft = `${-(navList.length-12)*(sum/2)}px`
        }

        left.current.removeEventListener('click', handleSlideLeft)
        setTimeout(() => {
            left.current.addEventListener('click', handleSlideLeft)
        }, 800)
    }


    return ( <div ref={navbar} className={`${cx('navbar')}`}>
        <div className={`wrap`}>
            <div className='flex justify-between max1024:justify-center items-center'>
                <div className={`${cx('wrap_navlist')} flex items-center relative`}>
                    <ul className={`${cx('navlist')} flex items-center relative`}>
                        {serviceType.map((item, index) => {
                            return <li key={index}><NavItem type={item.type} title={item.name} Component={item.Component}/></li>
                        })}
                    </ul>
                    <Left ref={left}/>
                    <Right ref={right}/>
                </div>
                <div>
                    <div className={`slg1250:pl-6 max1024:hidden`}>
                        <div ref={filterRef} onClick={() => {
                            handleSetBigBox('Bộ lọc', 'filter')
                            handleDisplayBigBox()
                        }} className={`${cx('filter')} rounded-xl text-xs flex items-center px-4 py-4 cursor-pointer relative justify-between`}>
                            <TbGitPullRequestClosed className='text-base'/>
                            <span className='ml-2 font-bold'>Bộ lọc</span>
                            <div ref={checkRef} className='text-green-600 text-2xl absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] hidden'><BsCheckCircleFill/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> );
}

export default Navbar;
import React from 'react'
import { Divider } from 'antd'
import {
  IdcardTwoTone,
  ProjectTwoTone,
  CameraTwoTone,
  EyeTwoTone,
  HourglassTwoTone,
  DollarTwoTone,
  ControlTwoTone,
  ProfileTwoTone,
  GiftTwoTone,
  FireTwoTone,
  DashboardTwoTone,
  CompassTwoTone,
  // CodeTwoTone,
  TagTwoTone,
} from '@ant-design/icons'

import { Link } from 'react-router-dom'
import './home.less'

// import { Counter } from '@/counter/Counter';

const generatorList = [
  {
    name: 'person',
    icon:  <svg width="1em" height="1em" viewBox="0 0 48 48"><path fill="#FF9800" d="M24 37l-5-6v-6h10v6z"></path><g fill="#FFA726"><circle cx="33" cy="19" r="2"></circle><circle cx="15" cy="19" r="2"></circle></g><path fill="#FFB74D" d="M33 13c0-7.6-18-5-18 0v7c0 5 4 9 9 9s9-4 9-9v-7z"></path><path fill="#424242" d="M24 4c-6.1 0-10 4.9-10 11v2.3l2 1.7v-5l12-4l4 4v5l2-1.7V15c0-4-1-8-6-9l-1-2h-3z"></path><g fill="#784719"><circle cx="28" cy="19" r="1"></circle><circle cx="20" cy="19" r="1"></circle></g><path fill="#fff" d="M24 43l-5-12l5 1l5-1z"></path><path fill="#D32F2F" d="M23 35l-.7 4.5l1.7 4l1.7-4L25 35l1-1l-2-2l-2 2z"></path><path fill="#546E7A" d="M29 31l-5 12l-5-12S8 33 8 44h32c0-11-11-13-11-13z"></path></svg>
  },
  {
    name: 'bing',
    icon: <svg width="1em" height="1em" viewBox="0 0 48 48"><path fill="#64B5F6" d="M17.474 8.578l26.544 8.904l-8.904 26.544L8.57 35.122z"></path><path fill="#1E88E5" d="M19.238 12.504l20.922 6.82l-6.2 19.02l-20.922-6.82z"></path><path fill="#90CAF9" d="M10.881 5.778l27.524 5.068l-5.068 27.524l-27.524-5.068z"></path><path fill="#42A5F5" d="M13.219 9.444l21.67 3.85l-3.5 19.7l-21.67-3.85z"></path><path fill="#BBDEFB" d="M4 4h28v28H4z"></path><path fill="#4CAF50" d="M7 7h22v20H7z"></path><path fill="#fff" d="M16 13c0-1.1.9-2 2-2s2 .9 2 2s-2 4-2 4s-2-2.9-2-4z"></path><path fill="#fff" d="M20 21c0 1.1-.9 2-2 2s-2-.9-2-2s2-4 2-4s2 2.9 2 4z"></path><path fill="#fff" d="M13.5 16.7c-1-.6-1.3-1.8-.7-2.7c.6-1 1.8-1.3 2.7-.7c1 .6 2.5 3.7 2.5 3.7s-3.5.3-4.5-.3z"></path><path fill="#fff" d="M22.5 17.3c1 .6 1.3 1.8.7 2.7c-.6 1-1.8 1.3-2.7.7c-1-.5-2.5-3.7-2.5-3.7s3.5-.3 4.5.3z"></path><path fill="#fff" d="M22.5 16.7c1-.6 1.3-1.8.7-2.7c-.6-1-1.8-1.3-2.7-.7c-1 .5-2.5 3.7-2.5 3.7s3.5.3 4.5-.3z"></path><path fill="#fff" d="M13.5 17.3c-1 .6-1.3 1.8-.7 2.7c.6 1 1.8 1.3 2.7.7c1-.6 2.5-3.7 2.5-3.7s-3.5-.3-4.5.3z"></path><circle fill="#FFC107" cx="18" cy="17" r="2"></circle></svg>
  },
  {
    name: 'nasa',
    icon: <svg width="1em" height="1em" viewBox="0 0 48 48"><path fill="#F57C00" d="M40 41H8c-2.2 0-4-1.8-4-4V11c0-2.2 1.8-4 4-4h32c2.2 0 4 1.8 4 4v26c0 2.2-1.8 4-4 4z"></path><circle fill="#FFF9C4" cx="35" cy="16" r="3"></circle><path fill="#942A09" d="M20 16L9 32h22z"></path><path fill="#BF360C" d="M31 22l-8 10h16z"></path></svg>
  },
  {
    name: 'color',
    icon: <svg width="1em" height="1em" viewBox="0 0 48 48"><path fill="#2E7D32" d="M5 24c0 18.9 14.8 19 17 19h4S24.1 26.5 5 24z"></path><path fill="#388E3C" d="M22 26h4v17h-4z"></path><path fill="#C62828" d="M34 16c0 5.1-5.2 8.2-8 8.2s-2-3.1-2-8.2s5-9.2 5-9.2s5 4.1 5 9.2z"></path><path fill="#C62828" d="M14 16c0 5.1 5.2 8.2 8 8.2s2-3.1 2-8.2s-5-9.2-5-9.2s-5 4.1-5 9.2z"></path><path fill="#E53935" d="M24 27c-2.2-1.6-1.9-4.5 2.4-8.8C30.8 13.8 32 7 32 7s5 3.4 5 9c0 5.9-5.7 11-13 11z"></path><path fill="#E53935" d="M24 27c2.2-1.6 1.9-4.5-2.4-8.8C17.2 13.8 16 7 16 7s-5 3.4-5 9c0 5.9 5.7 11 13 11z"></path><path fill="#F44336" d="M30 16c0 6.1-2.7 11-6 11s-6-4.9-6-11s6-11 6-11s6 4.9 6 11z"></path><path fill="#4CAF50" d="M22 43h4c2.2 0 17-.1 17-19c-19.1 2.5-21 19-21 19z"></path></svg>
  },
  {
    name: 'lottery',
    icon: <svg width="1em" height="1em" viewBox="0 0 48 48"><circle fill="#F44336" cx="24" cy="24" r="21"></circle><path fill="#FFCA28" d="M24 11l3.9 7.9l8.7 1.3l-6.3 6.1l1.5 8.7l-7.8-4.1l-7.8 4.1l1.5-8.7l-6.3-6.1l8.7-1.3z"></path></svg>
  },
  {
    name: 'plumFlower',
    icon: <svg width="1em" height="1em" viewBox="0 0 48 48"><circle fill="#FFF59D" cx="24" cy="22" r="20"></circle><path fill="#FBC02D" d="M37 22c0-7.7-6.6-13.8-14.5-12.9c-6 .7-10.8 5.5-11.4 11.5c-.5 4.6 1.4 8.7 4.6 11.3c1.4 1.2 2.3 2.9 2.3 4.8v.3h12v-.1c0-1.8.8-3.6 2.2-4.8c2.9-2.4 4.8-6 4.8-10.1z"></path><path fill="#FFF59D" d="M30.6 20.2l-3-2c-.3-.2-.8-.2-1.1 0L24 19.8l-2.4-1.6c-.3-.2-.8-.2-1.1 0l-3 2c-.2.2-.4.4-.4.7s0 .6.2.8l3.8 4.7V37h2V26c0-.2-.1-.4-.2-.6l-3.3-4.1l1.5-1l2.4 1.6c.3.2.8.2 1.1 0l2.4-1.6l1.5 1l-3.3 4.1c-.1.2-.2.4-.2.6v11h2V26.4l3.8-4.7c.2-.2.3-.5.2-.8s-.2-.6-.4-.7z"></path><circle fill="#5C6BC0" cx="24" cy="44" r="3"></circle><path fill="#9FA8DA" d="M26 45h-4c-2.2 0-4-1.8-4-4v-5h12v5c0 2.2-1.8 4-4 4z"></path><g fill="#5C6BC0"><path d="M30 41l-11.6 1.6c.3.7.9 1.4 1.6 1.8l9.4-1.3c.4-.6.6-1.3.6-2.1z"></path><path d="M18 38.7v2L30 39v-2z"></path></g></svg>
  },
  // {
  //   name: 'docker',
  //   icon: <CodeTwoTone twoToneColor="#00bbbb" />
  // }
]
const cnverterList = [
  {
    name: 'encode',
    icon: <svg width="1em" height="1em" viewBox="0 0 48 48"><path fill="#B0BEC5" d="M37 42H5V32h32c2.8 0 5 2.2 5 5s-2.2 5-5 5z"></path><path fill="#37474F" d="M10 34c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1z"></path><path fill="#37474F" d="M19 34c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1z"></path><path fill="#37474F" d="M37 34c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1z"></path><path fill="#37474F" d="M28 34c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1z"></path><path fill="#FF9800" d="M35 31H11c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h24c1.1 0 2 .9 2 2v22c0 1.1-.9 2-2 2z"></path><path fill="#8A5100" d="M26.5 13h-7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h7c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path><path fill="#607D8B" d="M37 31H5v2h32c2.2 0 4 1.8 4 4s-1.8 4-4 4H5v2h32c3.3 0 6-2.7 6-6s-2.7-6-6-6z"></path></svg>
  },
  {
    name: 'hex',
    icon: <svg width="1em" height="1em" viewBox="0 0 48 48"><path fill="#3F51B5" d="M42 29H20.8c-.5 0-1-.2-1.4-.6l-3.7-3.7c-.4-.4-.4-1 0-1.4l3.7-3.7c.4-.4.9-.6 1.4-.6H42c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1z"></path><path fill="#CFD8DC" d="M9 6h2v36H9z"></path><g fill="#90A4AE"><circle cx="10" cy="10" r="3"></circle><circle cx="10" cy="24" r="3"></circle><circle cx="10" cy="38" r="3"></circle></g><path fill="#448AFF" d="M34 43H20.8c-.5 0-1-.2-1.4-.6l-3.7-3.7c-.4-.4-.4-1 0-1.4l3.7-3.7c.4-.4.9-.6 1.4-.6H34c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1z"></path><path fill="#00BCD4" d="M35 15H20.8c-.5 0-1-.2-1.4-.6l-3.7-3.7c-.4-.4-.4-1 0-1.4l3.7-3.7c.4-.4.9-.6 1.4-.6H35c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1z"></path></svg>
  },
  {
    name: 'currency',
    icon: <svg width="1em" height="1em" viewBox="0 0 48 48"><circle fill="#3F51B5" cx="18" cy="18" r="15"></circle><path fill="#FFF59D" d="M20.3 16v1.7h-3.8v1.4h3.8v1.7h-3.8c0 .6.1 1.2.3 1.6c.2.4.4.8.7 1c.3.3.7.4 1.1.6c.4.1.9.2 1.4.2c.4 0 .7 0 1.1-.1c.4-.1.7-.1 1-.3l.4 2.7c-.4.1-.9.2-1.4.2c-.5.1-1 .1-1.5.1c-.9 0-1.8-.1-2.6-.4c-.8-.2-1.5-.6-2-1.1c-.6-.5-1-1.1-1.4-1.9c-.3-.7-.5-1.6-.5-2.6h-1.9v-1.7h1.9v-1.4h-1.9V16h1.9c.1-1 .3-1.8.6-2.6c.4-.7.8-1.4 1.4-1.9c.6-.5 1.3-.9 2.1-1.1c.8-.3 1.7-.4 2.6-.4c.4 0 .9 0 1.3.1s.9.1 1.3.3l-.4 2.7c-.3-.1-.6-.2-1-.3c-.4-.1-.7-.1-1.1-.1c-.5 0-1 .1-1.4.2c-.4.1-.8.3-1 .6c-.3.3-.5.6-.7 1s-.3.9-.3 1.5h3.8z"></path><circle fill="#4CAF50" cx="30" cy="30" r="15"></circle><path fill="#fff" d="M28.4 27c.1.2.2.4.4.6c.2.2.4.4.7.5c.3.2.7.3 1.1.5c.7.3 1.4.6 2 .9c.6.3 1.1.7 1.5 1.1c.4.4.8.9 1 1.4c.2.5.4 1.2.4 1.9s-.1 1.3-.3 1.8c-.2.5-.5 1-.9 1.4s-.9.7-1.4.9c-.6.2-1.2.4-1.8.5v2.2h-1.8v-2.2c-.6-.1-1.2-.2-1.8-.4s-1.1-.5-1.5-1c-.5-.4-.8-1-1.1-1.6c-.3-.6-.4-1.4-.4-2.3h3.3c0 .5.1 1 .2 1.3c.1.4.3.6.6.9c.2.2.5.4.8.5c.3.1.6.1.9.1c.4 0 .7 0 .9-.1c.3-.1.5-.2.7-.4c.2-.2.3-.4.4-.6c.1-.2.1-.5.1-.8c0-.3 0-.6-.1-.8c-.1-.2-.2-.5-.4-.7s-.4-.4-.7-.5c-.3-.2-.7-.3-1.1-.5c-.7-.3-1.4-.6-2-.9c-.6-.3-1.1-.7-1.5-1.1c-.4-.4-.8-.9-1-1.4c-.2-.5-.4-1.2-.4-1.9c0-.6.1-1.2.3-1.7c.2-.5.5-1 .9-1.4c.4-.4.9-.7 1.4-1c.5-.2 1.2-.4 1.8-.5v-2.4h1.8v2.4c.6.1 1.2.3 1.8.6c.5.3 1 .6 1.3 1.1c.4.4.7 1 .9 1.6c.2.6.3 1.3.3 2h-3.3c0-.9-.2-1.6-.6-2c-.4-.4-.9-.7-1.5-.7c-.3 0-.6.1-.9.2c-.2.1-.4.2-.6.4c-.2.2-.3.4-.3.6c-.1.2-.1.5-.1.8c-.1.2 0 .5 0 .7z"></path></svg>
  },
  {
    name: 'queryString',
    icon: <svg width="1em" height="1em" viewBox="0 0 48 48"><g fill="#616161"><path d="M29.175 31.99l2.828-2.827l12.019 12.019l-2.828 2.827z"></path><circle cx="20" cy="20" r="16"></circle></g><path fill="#37474F" d="M32.45 35.34l2.827-2.828l8.696 8.696l-2.828 2.828z"></path><circle fill="#64B5F6" cx="20" cy="20" r="13"></circle><path fill="#BBDEFB" d="M26.9 14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2 1.2-6.9 3.2c-.4.4-.3 1.1.1 1.4c.4.4 1.1.3 1.4-.1C16 13.9 17.9 13 20 13s4 .9 5.4 2.5c.2.2.5.4.8.4c.2 0 .5-.1.6-.2c.4-.4.4-1.1.1-1.5z"></path></svg>
  },
  {
    name: 'QRCode',
    icon: <svg width="1em" height="1em" viewBox="0 0 48 48"><path fill="#607D8B" d="M38 42H10c-2.2 0-4-1.8-4-4V10c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4v28c0 2.2-1.8 4-4 4z"></path><circle fill="#455A64" cx="24" cy="24" r="12"></circle><circle fill="#42A5F5" cx="24" cy="24" r="9"></circle><path fill="#90CAF9" d="M28.8 21c-1.2-1.4-3-2.2-4.8-2.2s-3.6.8-4.8 2.2c-.5.5-.4 1.3.1 1.8s1.3.4 1.8-.1c1.5-1.7 4.3-1.7 5.8 0c.3.3.6.4 1 .4c.3 0 .6-.1.9-.3c.4-.4.5-1.3 0-1.8z"></path></svg>
  },
  {
    name: 'svg',
    icon: <svg width="1em" height="1em" viewBox="0 0 48 48"><path fill="#8CBCD6" d="M31 41H8c-2.2 0-4-1.8-4-4V11c0-2.2 1.8-4 4-4h32c2.2 0 4 1.8 4 4v17c0 7.2-5.8 13-13 13z"></path><circle fill="#B3DDF5" cx="35" cy="16" r="3"></circle><path fill="#9AC9E3" d="M20 16L9 32h22z"></path><path fill="#B3DDF5" d="M31 22l-8 10h16z"></path><path fill="#E57373" d="M47.7 29.1l-2.8-2.8c-.4-.4-1.1-.4-1.6 0L42 27.6l4.4 4.4l1.3-1.3c.4-.4.4-1.1 0-1.6z"></path><path fill="#FF9800" d="M27.467 42.167L39.77 29.865l4.384 4.384L31.85 46.55z"></path><path fill="#B0BEC5" d="M46.4 32.038l-2.192 2.192l-4.383-4.384l2.192-2.191z"></path><path fill="#FFC107" d="M27.5 42.2L26 48l5.8-1.5z"></path><path fill="#37474F" d="M26.7 45l-.7 3l3-.7z"></path></svg>
  }
]
const analyzerList = [
  {
    name: 'iPAddress',
    icon: <svg width="1em" height="1em" viewBox="0 0 48 48"><path fill="#7CB342" d="M24 4C13 4 4 13 4 24s9 20 20 20s20-9 20-20S35 4 24 4z"></path><path fill="#0277BD" d="M45 24c0 11.7-9.5 21-21 21S3 35.7 3 24S12.3 3 24 3s21 9.3 21 21zm-21.2 9.7c0-.4-.2-.6-.6-.8c-1.3-.4-2.5-.4-3.6-1.5c-.2-.4-.2-.8-.4-1.3c-.4-.4-1.5-.6-2.1-.8h-4.2c-.6-.2-1.1-1.1-1.5-1.7c0-.2 0-.6-.4-.6c-.4-.2-.8.2-1.3 0c-.2-.2-.2-.4-.2-.6c0-.6.4-1.3.8-1.7c.6-.4 1.3.2 1.9.2c.2 0 .2 0 .4.2c.6.2.8 1 .8 1.7v.4c0 .2.2.2.4.2c.2-1.1.2-2.1.4-3.2c0-1.3 1.3-2.5 2.3-2.9c.4-.2.6.2 1.1 0c1.3-.4 4.4-1.7 3.8-3.4c-.4-1.5-1.7-2.9-3.4-2.7c-.4.2-.6.4-1 .6c-.6.4-1.9 1.7-2.5 1.7c-1.1-.2-1.1-1.7-.8-2.3c.2-.8 2.1-3.6 3.4-3.1l.8.8c.4.2 1.1.2 1.7.2c.2 0 .4 0 .6-.2c.2-.2.2-.2.2-.4c0-.6-.6-1.3-1-1.7c-.4-.4-1.1-.8-1.7-1.1c-2.1-.6-5.5.2-7.1 1.7s-2.9 4-3.8 6.1c-.4 1.3-.8 2.9-1 4.4c-.2 1-.4 1.9.2 2.9c.6 1.3 1.9 2.5 3.2 3.4c.8.6 2.5.6 3.4 1.7c.6.8.4 1.9.4 2.9c0 1.3.8 2.3 1.3 3.4c.2.6.4 1.5.6 2.1c0 .2.2 1.5.2 1.7c1.3.6 2.3 1.3 3.8 1.7c.2 0 1-1.3 1-1.5c.6-.6 1.1-1.5 1.7-1.9c.4-.2.8-.4 1.3-.8c.4-.4.6-1.3.8-1.9c.1-.5.3-1.3.1-1.9zm.4-19.4c.2 0 .4-.2.8-.4c.6-.4 1.3-1.1 1.9-1.5c.6-.4 1.3-1.1 1.7-1.5c.6-.4 1.1-1.3 1.3-1.9c.2-.4.8-1.3.6-1.9c-.2-.4-1.3-.6-1.7-.8c-1.7-.4-3.1-.6-4.8-.6c-.6 0-1.5.2-1.7.8c-.2 1.1.6.8 1.5 1.1c0 0 .2 1.7.2 1.9c.2 1-.4 1.7-.4 2.7c0 .6 0 1.7.4 2.1h.2zM41.8 29c.2-.4.2-1.1.4-1.5c.2-1 .2-2.1.2-3.1c0-2.1-.2-4.2-.8-6.1c-.4-.6-.6-1.3-.8-1.9c-.4-1.1-1-2.1-1.9-2.9c-.8-1.1-1.9-4-3.8-3.1c-.6.2-1 1-1.5 1.5c-.4.6-.8 1.3-1.3 1.9c-.2.2-.4.6-.2.8c0 .2.2.2.4.2c.4.2.6.2 1 .4c.2 0 .4.2.2.4c0 0 0 .2-.2.2c-1 1.1-2.1 1.9-3.1 2.9c-.2.2-.4.6-.4.8c0 .2.2.2.2.4s-.2.2-.4.4c-.4.2-.8.4-1.1.6c-.2.4 0 1.1-.2 1.5c-.2 1.1-.8 1.9-1.3 2.9c-.4.6-.6 1.3-1 1.9c0 .8-.2 1.5.2 2.1c1 1.5 2.9.6 4.4 1.3c.4.2.8.2 1.1.6c.6.6.6 1.7.8 2.3c.2.8.4 1.7.8 2.5c.2 1 .6 2.1.8 2.9c1.9-1.5 3.6-3.1 4.8-5.2c1.5-1.3 2.1-3 2.7-4.7z"></path></svg>
  }
]

const genTitle = (str: string) => {
  const FirstLetter = str.slice(0, 1).toUpperCase()
  return FirstLetter + str.slice(1).replace(/[A-Z](?=[a-z])/g, (x: string) => ' ' + x)
}


const genBtn = (list: any[], key: string) =>
  list.map((x: { name: string; icon: React.ReactChild }, i: number) => (
    <Link
      className="item inline-block align-top center m10"
      type="primary"
      key={key + i}
      to={'/' + x.name}
      title={genTitle(x.name)}>
      <div className="block">{x.icon}</div>
      <div className="text">{genTitle(x.name)}</div>
    </Link>
  ))
const Home = (props: any) => (
  <div className="app-home">
    <section className="home-container">
      <h1 className="common-title page-title">
        <img src="./logo-lab-thin.svg" alt="lab-logo" className="lab-logo" />
        project Lab
      </h1>
      <h2>Generator</h2>
      <div className="btn-list">{genBtn(generatorList, 'gen')}</div>
      <h2>Converter</h2>
      <div className="btn-list">{genBtn(cnverterList, 'cov')}</div>
      <h2>Analyzer</h2>
      <div className="btn-list">{genBtn(analyzerList, 'aly')}</div>
    </section>
    {/* <Counter /> */}
    <footer className="github">
      <Divider>
        <span className="footertext">
          <span>2020-present</span>
          <span className="splitcolor">\</span>
          <span>made by </span>
          <a
            href="https://github.com/hz2/project-lab"
            target="_blank"
            rel="noopener noreferrer">
            hz2
          </a>
          <span className="splitcolor">\</span>
          <a
            href="https://github.com/hz2/project-lab/discussions/new"
            target="_blank"
            rel="noopener noreferrer">
            feedback
          </a>
        </span>
      </Divider>
    </footer>
  </div>
)

export default Home

import React from 'react'
import DeleteAccountImage from '../../../../assets/delete_account.png'
import './account-deleted-page.css'

const AccountDeletedPage = () => {
  return (
    <div className={'account-deleted'}>
    <p className={'account-deleted-text'}>Your account has been deleted.</p>
      <img className={'account-deleted-image'} src={DeleteAccountImage} alt={'account-deleted'}/> 
    </div>
  )
}

export default AccountDeletedPage
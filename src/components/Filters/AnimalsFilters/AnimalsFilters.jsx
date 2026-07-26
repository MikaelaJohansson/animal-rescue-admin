import React from 'react'
import styles from "./AnimalsFilters.module.css"

export default function AnimalsFilters(
  { setSearchText, 
    searchText, 
    selectedStatus, 
    setSelectedStatus,
    selectedGender, 
    setSelectedGender,
    onOpenAddModal
  }
  ){

  return (
    <div className={styles.filterContainerMain}>

      <div className={styles.filterContainer}>

        {/*  Search field */}
        <input type="search" value={searchText} onChange={(event)=>setSearchText(event.target.value)} placeholder='Search by name or breed' />


        {/*filter dropdowns. */}
        <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
          <option value="">Status</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Adopted">Adopted</option>
            <option value="In Foster Care">In Foster Care</option>
            <option value="Medical Hold">Medical Hold</option>
        </select>

        <select value={selectedGender} onChange={(event) => setSelectedGender(event.target.value)}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* button add animal */}
        <button type='button' onClick={onOpenAddModal}>+ Add animal</button>

      </div>

    </div>
  )
}

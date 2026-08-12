import styles from "./AdoptionsFilters.module.css"

export default function AdoptionsFilters({
    searchText,
    setSearchText,
    selectedStatus,
    setSelectedStatus,
    selectedDateSort,
    setSelectedDateSort
  }) {



  return (
    <div className={styles.AdoptionsfilterContainerMain}>

      <div className={styles.AdoptionsfilterContainer}>

        {/*  Search field */}
        <input type="search" value={searchText} onChange={(event)=>setSearchText(event.target.value)} placeholder='Search applicant, email or animal...' />


        {/*filter dropdowns. */}
        <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
          <option value="">Status</option>
            <option value="New">New</option>
            <option value="In Review">In Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
        </select>

        <select value={selectedDateSort}onChange={(event) => setSelectedDateSort(event.target.value)}>
            <option value="">Date</option>
            <option value="Newest first">Newest first</option>
            <option value="Oldest first">Oldest first</option>
        </select>

      </div>

    </div>
  )
}

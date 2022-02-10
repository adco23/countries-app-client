import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filerActivity, getActivities } from '../redux/action';

const ActivityFilter = ({pagination}) => {
  const dispatch = useDispatch();
  const activities = useSelector(state => state.activities);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);
  
  const handleFilterActiviy = e => {
    e.preventDefault();
    dispatch(filerActivity(e.target.value))
    pagination(1);
  }

  return (
    <div>
      <select onChange={e => handleFilterActiviy(e)}>
        <option value="All">Activities</option>
        {activities?.map(act =>
          <option key={act.id} value={act.name}>{act.name}</option>
        )}
      </select>
    </div>
  )
};

export default ActivityFilter;
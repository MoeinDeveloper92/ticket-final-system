import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TicketItem from '../components/TicketItem'
import Backbutton from '../components/Backbutton'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
const Tickets = () => {
    const { tickets, isSuccess, isLoading } = useSelector((state) => state.ticket)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTickets())

        return () => {
            //if we want sth happens on unmount, we need to put that login in unmount of useEffects
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])


    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <Backbutton url={"/"} />
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map((ticket) => (
                    <TicketItem
                        key={ticket._id}
                        ticket={ticket}
                    />
                ))}
            </div>
        </>
    )
}

export default Tickets
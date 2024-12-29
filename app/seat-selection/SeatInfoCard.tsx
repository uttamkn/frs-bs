import { SeatInfo } from "./types"

interface SeatInfoCardProps {
  seat: SeatInfo
  onClose: () => void
  onSelect: (seat: SeatInfo) => void
  onUnselect: (seat: SeatInfo) => void
  isSelected: boolean
}

export default function SeatInfoCard({ seat, onClose, onSelect, onUnselect, isSelected }: SeatInfoCardProps) {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Seat Information</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>
      <div className="card-body">
        <p><strong>Seat Number:</strong> {seat.number}</p>
        <p><strong>Class:</strong> {seat.class}</p>
        <p><strong>Price:</strong> ${seat.price}</p>
      </div>
      <div className="card-footer">
        {isSelected ? (
          <button className="btn btn-danger w-100" onClick={() => onUnselect(seat)}>
            Unselect This Seat
          </button>
        ) : (
          <button className="btn btn-primary w-100" onClick={() => onSelect(seat)}>
            Select This Seat
          </button>
        )}
      </div>
    </div>
  )
}


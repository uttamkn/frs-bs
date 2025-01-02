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
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <span className="text-muted">Seat Number:</span>
          <span className="fs-4 fw-bold">{seat.number}</span>
        </div>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <span className="text-muted">Class:</span>
          <span className="fw-semibold">{seat.class}</span>
        </div>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <span className="text-muted">Price:</span>
          <span className="fs-5 fw-bold text-success">${seat.price.toFixed(2)}</span>
        </div>
        {seat.class === "Business" && (
          <div className="alert alert-info d-flex align-items-center" role="alert">
            <i className="bi bi-info-circle-fill me-2"></i>
            <div>
              Business class seats come with extra legroom and premium services.
            </div>
          </div>
        )}
      </div>
      <div className="card-footer">
        <button
          className={`btn w-100 ${isSelected ? 'btn-danger' : 'btn-primary'}`}
          onClick={() => (isSelected ? onUnselect(seat) : onSelect(seat))}
        >
          {isSelected ? (
            <>
              <i className="bi bi-x-circle me-2"></i> Unselect This Seat
            </>
          ) : (
            <>
              <i className="bi bi-check-circle me-2"></i> Select This Seat
            </>
          )}
        </button>
      </div>
    </div>
  )
}


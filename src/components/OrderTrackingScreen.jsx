import { useState, useEffect, useCallback } from 'react';
import { ORDERS } from '../data/mockOrders';
import {
  formatDate,
  formatDateTime,
  getProgressPercent,
} from '../utils/helpers';
import {
  IconChevronLeft,
  IconRefresh,
  IconClock,
  IconAlertTriangle,
  IconMapPin,
  IconPhone,
  IconMessageCircle,
  IconShield,
  IconInfo,
  IconCopy,
  IconPackage,
  IconTruck,
  IconCheck,
} from './Icons';
import Timeline from './Timeline';
import ProductSummary from './ProductSummary';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorState from './ErrorState';
import Toast from './Toast';
import BottomSheet from './BottomSheet';

const SCENARIOS = [
  { key: 'delayed', label: 'Delayed', accent: 'delay' },
  { key: 'deliveredNotReceived', label: 'Delivered', accent: 'delivered' },
  { key: 'trackingUnavailable', label: 'No Tracking', accent: 'unavailable' },
];

export default function OrderTrackingScreen({ productImage }) {
  const [scenario, setScenario] = useState('delayed');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(null);
  const [sheet, setSheet] = useState(null); 
  const order = ORDERS[scenario];

  useEffect(() => {
    setLoading(true);
    setError(false);
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, [scenario]);

  const handleRetry = useCallback(() => {
    setError(false);
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  }, []);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard?.writeText(text);
    setToast('Copied to clipboard');
  }, []);

  const isDelayed = scenario === 'delayed';
  const isDelivered = scenario === 'deliveredNotReceived';
  const isUnavailable = scenario === 'trackingUnavailable';

  const statusClass = isDelayed
    ? 'delayed'
    : isDelivered
      ? 'delivered'
      : order.status === 'in_transit'
        ? 'in-transit'
        : 'processing';

  const progress = getProgressPercent(order.timeline);

  const progressColor = isDelayed ? 'warning' : isDelivered ? 'success' : 'default';

  const badgeLabel = isDelayed
    ? 'Delayed'
    : isDelivered
      ? 'Delivered'
      : 'Processing';

  const headline = isDelayed
    ? 'Your order is delayed'
    : isDelivered
      ? 'Delivered to your address'
      : 'Your order is being prepared';

  const subtext = isDelayed
    ? "Weather conditions are causing a delay at the distribution center. We're working to get your package moving."
    : isDelivered
      ? `Left at front porch on ${formatDate(order.timeline[5]?.date)}`
      : "We've received your order and it's being prepared for shipment. Tracking will update once shipped.";

  return (
    <div className="app-shell">
      <header className="header">
        <div className="header-inner">
          <button className="header-back" aria-label="Go back">
            <IconChevronLeft size={20} />
          </button>
          <h1 className="header-title">Order Tracking</h1>
          <button
            className="header-action"
            aria-label="Refresh"
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 900);
            }}
          >
            <IconRefresh size={18} />
          </button>
        </div>
      </header>

      <div className="scenario-bar">
        {SCENARIOS.map((s) => (
          <button
            key={s.key}
            className={`scenario-tab ${scenario === s.key ? `active ${s.accent}` : ''}`}
            onClick={() => setScenario(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading && <LoadingSkeleton />}

      {error && !loading && <ErrorState onRetry={handleRetry} />}

      {!loading && !error && (
        <div className="content" key={scenario}>
          <div className={`status-hero status-${statusClass}`}>
            <div className={`status-badge ${statusClass}`}>
              <span className="pulse-dot" />
              {badgeLabel}
            </div>

            <h2 className="status-headline">{headline}</h2>
            <p className="status-subtext">{subtext}</p>

            {isDelayed && (
              <div className="eta-row warning">
                <div className="eta-icon warning">
                  <IconClock size={18} />
                </div>
                <div className="eta-details">
                  <div className="eta-label">Estimated Delivery</div>
                  <div className="eta-value strikethrough">
                    {formatDate(order.estimatedDelivery)}
                  </div>
                  <div className="eta-value revised">
                    {formatDate(order.revisedDelivery)} (revised)
                  </div>
                </div>
              </div>
            )}

            {isDelivered && (
              <div className="eta-row">
                <div className="eta-icon success">
                  <IconCheck size={18} />
                </div>
                <div className="eta-details">
                  <div className="eta-label">Delivered On</div>
                  <div className="eta-value">
                    {formatDateTime(order.timeline[5]?.date)}
                  </div>
                </div>
              </div>
            )}

            {isUnavailable && (
              <div className="eta-row">
                <div className="eta-icon default">
                  <IconClock size={18} />
                </div>
                <div className="eta-details">
                  <div className="eta-label">Estimated Delivery</div>
                  <div className="eta-value">
                    {formatDate(order.estimatedDelivery)}
                  </div>
                </div>
              </div>
            )}

            <div className="progress-bar-container">
              <div className="progress-track">
                <div
                  className={`progress-fill ${progressColor}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="progress-labels">
                <span>Ordered</span>
                <span>{isDelivered ? 'Delivered' : 'Delivery'}</span>
              </div>
            </div>
          </div>

          {isDelayed && (
            <div className="alert-banner warning">
              <div className="alert-icon">
                <IconAlertTriangle size={18} />
              </div>
              <div className="alert-content">
                <div className="alert-title">Delivery Delayed</div>
                <div className="alert-desc">
                  Severe weather in the Chicago area is affecting shipments. Your revised delivery date is{' '}
                  <strong>{formatDate(order.revisedDelivery)}</strong>. No action needed — we'll notify you with updates.
                </div>
              </div>
            </div>
          )}

          {isDelivered && (
            <div className="alert-banner danger">
              <div className="alert-icon">
                <IconShield size={18} />
              </div>
              <div className="alert-content">
                <div className="alert-title">Didn't receive your package?</div>
                <div className="alert-desc">
                  If your order shows delivered but you haven't received it, you can file a missing delivery report. We'll investigate and resolve this within 48 hours.
                </div>
              </div>
            </div>
          )}

          {isUnavailable && (
            <div className="alert-banner info">
              <div className="alert-icon">
                <IconInfo size={18} />
              </div>
              <div className="alert-content">
                <div className="alert-title">Tracking Not Available Yet</div>
                <div className="alert-desc">
                  Your order is being prepared. Tracking information will be available once the carrier picks up your package, typically within 1–2 business days.
                </div>
              </div>
            </div>
          )}

          <div className="action-buttons" style={{ marginBottom: 12 }}>
            {isDelayed && (
              <>
                <button className="btn btn-primary amber" onClick={() => setSheet('support')}>
                  <IconMessageCircle size={16} />
                  Contact Support About Delay
                </button>
                <button className="btn btn-outline" onClick={() => setSheet('details')}>
                  <IconInfo size={16} />
                  View Carrier Details
                </button>
              </>
            )}

            {isDelivered && (
              <>
                <button className="btn btn-primary red" onClick={() => setSheet('report')}>
                  <IconAlertTriangle size={16} />
                  Report Missing Delivery
                </button>
                <button className="btn btn-secondary" onClick={() => setSheet('support')}>
                  <IconMessageCircle size={16} />
                  Chat with Support
                </button>
              </>
            )}

            {isUnavailable && (
              <button className="btn btn-outline" onClick={() => setSheet('support')}>
                <IconMessageCircle size={16} />
                Questions? Contact Support
              </button>
            )}
          </div>

          <div className="section-card">
            <div className="section-header">
              <h3 className="section-title">Tracking Timeline</h3>
              {order.lastUpdated && (
                <span className="section-action" style={{ cursor: 'default' }}>
                  Updated {formatDate(order.lastUpdated, { month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>

            {isUnavailable ? (
              <div className="tracking-unavailable">
                <div className="tracking-unavailable-icon">
                  <IconPackage size={32} />
                </div>
                <h3>Awaiting Carrier Pickup</h3>
                <p>
                  Your package is being prepared. Once it's picked up by the carrier,
                  real-time tracking will appear here.
                </p>
              </div>
            ) : (
              <Timeline steps={order.timeline} />
            )}
          </div>

          <div className="section-card">
            <div className="section-header">
              <h3 className="section-title">Order Summary</h3>
              <button className="section-action" onClick={() => setSheet('details')}>
                Details
              </button>
            </div>
            <ProductSummary product={order.product} productImage={productImage} />
          </div>

          {(order.carrier || order.trackingNumber) && (
            <div className="section-card">
              <div className="section-header">
                <h3 className="section-title">Shipment Information</h3>
              </div>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-row-label">Order ID</span>
                  <span className="info-row-value">
                    {order.id}
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(order.id)}
                      aria-label="Copy order ID"
                    >
                      <IconCopy size={14} />
                    </button>
                  </span>
                </div>
                {order.carrier && (
                  <div className="info-row">
                    <span className="info-row-label">Carrier</span>
                    <span className="info-row-value">{order.carrier}</span>
                  </div>
                )}
                {order.trackingNumber && (
                  <div className="info-row">
                    <span className="info-row-label">Tracking #</span>
                    <span className="info-row-value">
                      {order.trackingNumber}
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(order.trackingNumber)}
                        aria-label="Copy tracking number"
                      >
                        <IconCopy size={14} />
                      </button>
                    </span>
                  </div>
                )}
                {order.lastLocation && (
                  <div className="info-row">
                    <span className="info-row-label">Last Location</span>
                    <span className="info-row-value">
                      <IconMapPin size={13} />
                      {order.lastLocation}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {isUnavailable && (
            <div className="section-card">
              <div className="section-header">
                <h3 className="section-title">Order Information</h3>
              </div>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-row-label">Order ID</span>
                  <span className="info-row-value">
                    {order.id}
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(order.id)}
                      aria-label="Copy order ID"
                    >
                      <IconCopy size={14} />
                    </button>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-row-label">Placed On</span>
                  <span className="info-row-value">{formatDate(order.placedAt)}</span>
                </div>
                <div className="info-row">
                  <span className="info-row-label">Carrier</span>
                  <span className="info-row-value" style={{ color: 'var(--gray-400)' }}>
                    Pending assignment
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-row-label">Tracking #</span>
                  <span className="info-row-value" style={{ color: 'var(--gray-400)' }}>
                    Available after shipping
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="support-footer">
            <h3 className="support-footer-title">Need Help?</h3>
            <p className="support-footer-desc">Our support team is available 24/7</p>
            <div className="support-options">
              <button className="support-option" onClick={() => setSheet('support')}>
                <IconMessageCircle size={20} />
                Live Chat
              </button>
              <button className="support-option" onClick={() => setSheet('support')}>
                <IconPhone size={20} />
                Call Us
              </button>
              <button className="support-option" onClick={() => setSheet('support')}>
                <IconShield size={20} />
                Help Center
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {sheet === 'support' && (
        <BottomSheet title="Contact Support" onClose={() => setSheet(null)}>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: 20, lineHeight: 1.5 }}>
            Our team is here to help. Choose how you'd like to reach us:
          </p>
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => { setSheet(null); setToast('Support chat started'); }}>
              <IconMessageCircle size={16} />
              Start Live Chat
            </button>
            <button className="btn btn-secondary" onClick={() => { setSheet(null); setToast('Calling support...'); }}>
              <IconPhone size={16} />
              Call 1-800-SUPPORT
            </button>
            <button className="btn btn-outline" onClick={() => setSheet(null)}>
              Cancel
            </button>
          </div>
          <div className="divider" />
          <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textAlign: 'center' }}>
            Average wait time: ~2 minutes
          </p>
        </BottomSheet>
      )}

      {sheet === 'report' && (
        <BottomSheet title="Report Missing Delivery" onClose={() => setSheet(null)}>
          <div className="alert-banner danger" style={{ marginBottom: 16 }}>
            <div className="alert-icon">
              <IconShield size={18} />
            </div>
            <div className="alert-content">
              <div className="alert-title">Package Protection Active</div>
              <div className="alert-desc">
                Your order is covered by our delivery guarantee. Filing a report initiates an investigation.
              </div>
            </div>
          </div>

          <div className="info-rows" style={{ marginBottom: 20 }}>
            <div className="info-row">
              <span className="info-row-label">Order</span>
              <span className="info-row-value">{order.id}</span>
            </div>
            <div className="info-row">
              <span className="info-row-label">Marked Delivered</span>
              <span className="info-row-value">{formatDate(order.timeline[5]?.date)}</span>
            </div>
            <div className="info-row">
              <span className="info-row-label">Resolution Time</span>
              <span className="info-row-value">Within 48 hours</span>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn btn-primary red" onClick={() => { setSheet(null); setToast('Missing delivery report filed'); }}>
              <IconAlertTriangle size={16} />
              File Report
            </button>
            <button className="btn btn-outline" onClick={() => setSheet(null)}>
              Cancel
            </button>
          </div>
        </BottomSheet>
      )}

      {sheet === 'details' && (
        <BottomSheet title="Order Details" onClose={() => setSheet(null)}>
          <ProductSummary product={order.product} productImage={productImage} />
          <div className="divider" />
          <div className="info-rows">
            <div className="info-row">
              <span className="info-row-label">Order ID</span>
              <span className="info-row-value">{order.id}</span>
            </div>
            <div className="info-row">
              <span className="info-row-label">Placed On</span>
              <span className="info-row-value">{formatDate(order.placedAt)}</span>
            </div>
            <div className="info-row">
              <span className="info-row-label">Subtotal</span>
              <span className="info-row-value">${order.product.price.toFixed(2)}</span>
            </div>
            <div className="info-row">
              <span className="info-row-label">Shipping</span>
              <span className="info-row-value" style={{ color: 'var(--green-600)' }}>Free</span>
            </div>
            <div className="info-row">
              <span className="info-row-label" style={{ fontWeight: 700, color: 'var(--gray-800)' }}>Total</span>
              <span className="info-row-value" style={{ fontSize: '0.9rem' }}>${order.product.price.toFixed(2)}</span>
            </div>
          </div>
          <div className="divider" />
          <button className="btn btn-outline" onClick={() => setSheet(null)} style={{ width: '100%' }}>
            Close
          </button>
        </BottomSheet>
      )}
    </div>
  );
}

import PropTypes from 'prop-types';

const styles = `
  .data-list {
    font-family: inherit;
  }

  .data-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .data-list-heading {
    font-size: 20px;
    font-weight: 600;
    color: #1c1c1e;
    margin: 0;
    letter-spacing: -0.01em;
  }

  .data-list-sub {
    font-size: 14px;
    color: #8e8e93;
  }

  .no-data {
    text-align: center;
    padding: 40px 20px;
    color: #8e8e93;
    font-size: 14px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  }

  .data-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .data-item {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 12px rgba(0,0,0,0.03);
  }

  .data-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  }

  .data-item-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .data-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #f2f2f7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  .data-primary-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .data-date {
    font-size: 15px;
    font-weight: 600;
    color: #1c1c1e;
  }

  .data-time {
    font-size: 13px;
    color: #8e8e93;
  }

  .data-metrics {
    display: flex;
    gap: 24px;
  }

  .data-metric {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .metric-value {
    font-size: 16px;
    font-weight: 700;
  }

  .metric-label {
    font-size: 12px;
    font-weight: 500;
    color: #8e8e93;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .val-hr { color: #ff2d55; }
  .val-steps { color: #ff9500; }
  .val-sleep { color: #5856d6; }

  @media (max-width: 600px) {
    .data-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    .data-metrics {
      width: 100%;
      justify-content: space-between;
    }
    .data-metric {
      align-items: flex-start;
    }
  }
`;

const DataList = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="data-list">
          <div className="data-list-header">
            <h3 className="data-list-heading">Recent Records</h3>
          </div>
          <p className="no-data">No data found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="data-list">
        <div className="data-list-header">
          <h3 className="data-list-heading">Recent Records</h3>
          <span className="data-list-sub">{data.length} entries</span>
        </div>
        
        <div className="data-items">
          {data.slice().reverse().map((item) => {
            const dt = new Date(item.timestamp);
            return (
              <div key={item._id} className="data-item">
                <div className="data-item-left">
                  <div className="data-icon">📅</div>
                  <div className="data-primary-info">
                    <span className="data-date">{dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="data-time">{dt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div className="data-metrics">
                  <div className="data-metric">
                    <span className="metric-value val-hr">{item.heartRate} <span style={{fontSize: '12px', fontWeight: 500}}>bpm</span></span>
                    <span className="metric-label">Heart</span>
                  </div>
                  <div className="data-metric">
                    <span className="metric-value val-steps">{item.steps.toLocaleString()}</span>
                    <span className="metric-label">Steps</span>
                  </div>
                  <div className="data-metric">
                    <span className="metric-value val-sleep" style={{ color: '#5856d6'}}>{item.sleepHours}<span style={{fontSize: '12px', fontWeight: 500}}>h</span></span>
                    <span className="metric-label">Sleep</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

DataList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      heartRate: PropTypes.number.isRequired,
      steps: PropTypes.number.isRequired,
      sleepHours: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DataList;
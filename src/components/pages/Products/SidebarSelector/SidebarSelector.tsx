import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarSelector() {
  return (
    <div>
      {/* Head */}
      <div className="flex justify-between">
        <span>Categories</span>
        <span>Reset</span>
      </div>
      {/* Items */}
      <ul>
        <li className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="text-secondary text-xl">
              <FontAwesomeIcon icon={faSquareCheck} />
            </div>
            {/* Title */}
            <p>All categories</p>
          </div>
          {/* quantity */}
          <span>10</span>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="text-secondary-200 text-xl">
              <FontAwesomeIcon icon={faSquare} />
            </div>
            {/* Title */}
            <p>All categories</p>
          </div>
          {/* quantity */}
          <span>10</span>
        </li>
      </ul>
    </div>
  );
}

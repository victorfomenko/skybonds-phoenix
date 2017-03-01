import { getEmptyMarketReport } from '../data/helpers/defaultStructures';
import { isEqual } from 'lodash';

export const isMarketReportEmpty = (layer) => {
  const emptyReport = getEmptyMarketReport();
  const isLayersEmpty = isEqual(emptyReport.layers, layer.layers)
  const isUIEmpty = isEqual(emptyReport.ui, layer.ui)

  return isLayersEmpty && isLayersEmpty
}

/**
 * A single Led on the Blinkt!
 */
export interface Led {
  /**
   * The 0 based index of the Led on the Blinkt!
   */
  index: number;
  /**
   * The color of the Led as a valid CSS value
   */
  color: string;

  /**
   * TODO add docs
   */
  frequency?: number;
}

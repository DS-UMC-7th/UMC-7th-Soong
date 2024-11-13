export class CreateReviewDTO {
  constructor({ rating, comment, userId }) {
    this.rating = rating;
    this.comment = comment;
    this.userId = userId;
  }

  static validate(reviewData) {
    const { rating, comment, userId } = reviewData;
    if (typeof rating !== 'number' || rating < 1 || rating > 5) throw new ValidationError("Invalid 'rating'");
    if (!comment || typeof comment !== 'string') throw new ValidationError("Invalid or missing 'comment'");
    if (!userId || typeof userId !== 'string') throw new ValidationError("Invalid or missing 'userId'");
    return new CreateReviewDTO(reviewData);
  }
}

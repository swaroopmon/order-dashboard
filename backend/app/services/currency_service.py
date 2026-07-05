import httpx

from app.core.logger import logger

EXCHANGE_API = "https://api.frankfurter.dev/v1/latest?from=INR&to=USD"


def get_inr_to_usd_rate() -> float:
    """
    Returns the latest INR -> USD exchange rate.
    """

    try:
        with httpx.Client(timeout=5.0) as client:

            response = client.get(EXCHANGE_API)

            response.raise_for_status()

            data = response.json()

            rate = data["rates"]["USD"]

            logger.info(
                "Exchange rate fetched | INR->USD=%s",
                rate,
            )

            return rate

    except Exception as e:

        logger.error(
            "Exchange rate fetch failed | %s",
            str(e),
        )

        return 0.0
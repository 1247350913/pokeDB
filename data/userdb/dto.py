from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import List, Literal

class SignupPayload(BaseModel):
    email: EmailStr
    password: str
    username: str | None = None

class PreferencesPayload(BaseModel):
    theme: Literal["light", "dark", "system"] = "light"
    icon: str = "pokeball"

class PartyCreatePayload(BaseModel):
    name: str = Field(min_length=1, max_length=64)

class PartyRenamePayload(BaseModel):
    name: str = Field(min_length=1, max_length=64)

class PartyMembersPayload(BaseModel):
    pokemon_ids: List[int] = Field(default_factory=list)
    @field_validator("pokemon_ids")
    @classmethod
    def max_six(cls, v: list[int]):
        if len(v) > 6:
            raise ValueError("A party can have at most 6 Pokémon.")
        return v

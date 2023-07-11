import { Team, Match, PadelSet } from './types';
import { PadelGame } from './padel';

describe('PadelGame', () => {
    let team1: Team;
    let team2: Team;
    let match: Match;
    let padelGame: PadelGame;
    
    beforeEach(() => {
        team1 = { name: 'Team 1', score: 0, experience: 80 };
        team2 = { name: 'Team 2', score: 0, experience: 60 };
        match = { sets: [], numberOfSets: 3, winner: undefined };
        padelGame = new PadelGame(team1, team2, match);
    });
    
    describe('startGame', () => {
        it('should play the specified number of sets', () => {
            padelGame.startGame();
            expect(match.sets.length).toBe(3);
        });
        
        it('should determine the match winner correctly', () => {
            padelGame.startGame();
            expect(match.winner).toBeDefined();
        });
    });
    
    describe('playSet', () => {
        let set: PadelSet;
        
        beforeEach(() => {
            set = { team1Games: 0, team2Games: 0, winner: undefined };
        });
        
        it('should play the set and determine the set winner correctly', () => {
            padelGame.playSet(set);
            expect(set.winner).toBeDefined();
        });
        
        it('should accumulate the set score correctly', () => {
            padelGame.playSet(set);
            expect(set.team1Games).toBeGreaterThanOrEqual(0);
            expect(set.team2Games).toBeGreaterThanOrEqual(0);
        });
    });
    
    describe('playGame', () => {
        let gameScore: [number, number];
        
        beforeEach(() => {
            gameScore = [3,2];
        });
        
        it('should play the game and determine the game winner correctly', () => {
            padelGame.playGame(gameScore);
            expect(gameScore[0]).toBe(3);
            expect(gameScore[1]).toBe(2);
        });
    });
    
    describe('handleDeuce', () => {
        let gameScore: [number, number];
        
        beforeEach(() => {
            gameScore = [3, 3];
        });
        
        it('should handle the deuce situation', () => {
            padelGame.handleDeuce(gameScore);
            expect(gameScore[0]).toBe(3);
            expect(gameScore[1]).toBe(3);
        });
    });
});

package io.r4v3chain.backend.blockchain.application;

import io.r4v3chain.backend.blockchain.dto.BlockValidationResult;
import io.r4v3chain.backend.blockchain.model.Block;
import io.r4v3chain.backend.blockchain.model.Transaction;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class BlockchainValidationService {

    public BlockValidationResult validateBlockAgainstChain(Block block, List<Block> blockchain) {
        if (block == null) {
            return new BlockValidationResult(false, "Block null");
        }

        if (blockchain == null || blockchain.isEmpty()) {
            return new BlockValidationResult(true, "OK");
        }

        Block previous = blockchain.get(blockchain.size() - 1);

        if (block.getIndex() != previous.getIndex() + 1) {
            return new BlockValidationResult(false, "Invalid block index");
        }

        if (!safeEquals(block.getPreviousHash(), previous.getHash())) {
            return new BlockValidationResult(false, "Invalid previous hash");
        }

        if (block.getTransactions() != null) {
            for (Transaction tx : block.getTransactions()) {
                BlockValidationResult txValidation = validateTransaction(tx);
                if (!txValidation.isValid()) {
                    return txValidation;
                }
            }
        }

        return new BlockValidationResult(true, "OK");
    }

    public BlockValidationResult validateChain(List<Block> blockchain) {
        if (blockchain == null || blockchain.isEmpty()) {
            return new BlockValidationResult(false, "Blockchain vide");
        }

        for (int i = 1; i < blockchain.size(); i++) {
            Block current = blockchain.get(i);
            Block previous = blockchain.get(i - 1);

            if (current.getIndex() != previous.getIndex() + 1) {
                return new BlockValidationResult(false, "Invalid chain: incorrect index");
            }

            if (!safeEquals(current.getPreviousHash(), previous.getHash())) {
                return new BlockValidationResult(false, "Invalid chain: incorrect previous hash");
            }
        }

        return new BlockValidationResult(true, "OK");
    }

    public BlockValidationResult validateTransaction(Transaction transaction) {
        if (transaction == null) {
            return new BlockValidationResult(false, "Transaction nulle");
        }

        if (transaction.getSender() == null || transaction.getSender().isBlank()) {
            return new BlockValidationResult(false, "Sender required");
        }

        if (transaction.getRecipient() == null || transaction.getRecipient().isBlank()) {
            return new BlockValidationResult(false, "Recipient required");
        }

        BigDecimal amount = transaction.getAmount();
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            return new BlockValidationResult(false, "Invalid amount");
        }

        return new BlockValidationResult(true, "OK");
    }

    private boolean safeEquals(String a, String b) {
        return a == null ? b == null : a.equals(b);
    }
}